import { query } from "@/_lib/database";

export interface TemplateDTO {
    id: string;
    name: string;
    user_id: string;
}

export async function getAllTemplatesBy(
    userId: string
): Promise<TemplateDTO[]> {
    const { err, rows } = 
        await query("SELECT * FROM template WHERE user_id = $1", [userId]);

    if (err)
        return [];

    return rows
        .map(
            (r: any) => 
                ({ 
                    id: r.id,
                    name: r.name,
                    user_id: r.user_id
                } as TemplateDTO)
        );
}
