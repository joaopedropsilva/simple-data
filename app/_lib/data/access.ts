export async function getAllTemplates() {
    const { err, payload } = 
        await query("SELECT * FROM template");

    if (err != "")
        return { err, payload: [] } as Result;

    return { err, payload: payload!.rows };
}

export async function getAllTemplatesByUser(userId: string) {
    const { err, payload } = 
        await query("SELECT * FROM template WHERE user_id = $1", [userId]);

    if (err != "")
        return { err, payload: [] } as Result;

    return { err, payload: payload!.rows };
}
