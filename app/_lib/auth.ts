"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser, insertNewUser } from "@/_lib/user";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import { z } from "zod";

const loginFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Nome de usuário deve conter pelo menos 2 caracteres" })
        .trim(),
    email: z.string().email({ message: "Email incorreto ou inválido" }),
    password: z
        .string()
        .min(8, { message: "Senha incorreta ou inválida! Senhas devem conter pelo menos 8 caracteres, pelo menos uma letra e um número" })
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/)
        .regex(/[^a-zA-Z0-9]/)
        .trim()
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;


export async function auth(
    state: FormState,
    formData: FormData,
): Promise<FormState> {
    const validated = loginFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
        };
    }

    const validUserInfo = {
        username: validated.data.username,
        email: validated.data.email,
        password: await bcrypt.hash(validated.data.password, 10)
    }

    const userInDb = await getUser(validUserInfo);
    const userId = userInDb?.id! ?? uuidV4();

    if (!userInDb) {
        const user = {
            id: userId,
            ...validUserInfo
        };

        if (!insertNewUser(user))
            return { message: "Falha ao criar usuário!" };
    }

    await createSession(userId);
    redirect(`/?id=${uuidV4()}`);
}

// --- JWT

type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, key, {
          algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    // @ts-ignore
    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function deleteSession() {
    // @ts-ignore
    cookies().delete("session");
    redirect("/");
}

