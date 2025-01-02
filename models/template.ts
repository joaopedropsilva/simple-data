import { z } from "zod";
import { query } from "@/infra/database";
import { Result } from "@/models/result";


export const Template = z.object({
    id: z.string(),
    name: z.string(),
    user_id: z.string()
});

export async function getAllTemplates() {
    const { err, payload } = 
        await query("SELECT * FROM template");

    if (err != "")
        return { err, payload: [] } as Result;

    return { err, payload: payload!.rows };
}

export async function getAllTemplatesByUser(userId: number) {
    const { err, payload } = 
        await query("SELECT * FROM template WHERE user_id = $1", [userId]);

    if (err != "")
        return { err, payload: [] } as Result;

    return { err, payload: payload!.rows };
}

