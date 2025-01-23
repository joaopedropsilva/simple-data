import { query } from "@/_lib/database";

interface UserDTO {
    id?: string;
    username: string;
    email: string;
    password: string;
}

function mapRowsToUserDTO(rows: any): UserDTO[] {
    return rows
        .map((r: any) => ({
            id: r.id,
            username: r.username,
            email: r.email,
            password: r.password,
            created_at: r.created_at.toISOString()
        } as UserDTO));
}

export async function getUser(
    userData: UserDTO
): Promise<UserDTO | null> {
    const { err, rows } =
            await query(`
                SELECT
                    *
                FROM public.user
                WHERE username = $1
                    AND email = $2
                    AND password = $3
            `,
            [userData.username, userData.email, userData.password]);

    if (err) {
        console.error(err);

        return null;
    }

    return mapRowsToUserDTO(rows)[0];
}

export async function insertNewUser(
    userInfo: UserDTO
) {
    const { err } =
        await query(
            "INSERT INTO public.user (id, username, email, password) VALUES ($1, $2, $3, $4)",
            [userInfo.id!, userInfo.username, userInfo.email, userInfo.password]
        );

    if (err)
        console.error(err);
}

