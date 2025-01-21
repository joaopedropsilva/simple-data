"use server";

import { query } from "@/_lib/database";
import { z } from "zod";

export interface EntryDTO {
    id: string;
    name: string;
    user_id: string;
}

export interface FieldDTO {
    name: string;
    value: string;
    entry_id: string;
}

const clientFieldDataSchema = z.object({
    name: z.string().trim().min(1).max(100),
    value: z.string(),
});

const clientEntryDataSchema = z.object({
    id: z.string().trim().min(1).max(100),
    name: z.string().trim().min(1),
    fields: z.array(clientFieldDataSchema).nonempty()
});

export async function saveEntryAction(
    entryIncomingData: any
) {
    const validated = clientEntryDataSchema.safeParse(entryIncomingData);

    if (!validated.success)
        return

    const userId = "49449927-ffa3-4eaa-8c5c-7de126a4f786"; // recover current user_id
    let entryData = await getEntryById(validated.data.id);

    if (!entryData) {
        entryData = {
            id: validated.data.id,
            name: validated.data.name,
            user_id: userId
        }

        if(!insertNewEntry(entryData))
            return;
    } else
        updateEntryNameById(entryData.id, validated.data.name);

    deleteFieldsFromEntry(entryData.id);

    validated.data.fields.forEach(f => insertNewField({
        name: f.name,
        value: f.value,
        entry_id: entryData.id
    }));
}

// ----- ENTRY -----

export async function getEntryById(
    entryId: string
): Promise<EntryDTO | null> {
    const { err, rows } =
            await query(`
                SELECT
                    *
                FROM entry
                WHERE id = $1
            `,
            [entryId]);

    if (err) {
        console.error(err);

        return null;
    }

    return rows[0];
}

export async function getAllEntriesByUser(
    userId: string
): Promise<EntryDTO[]> {
    const { err, rows } = 
        await query("SELECT * FROM entry WHERE user_id = $1", [userId]);

    if (err) {
        console.error(err);

        return [];
    }

    return rows;
}

async function insertNewEntry(
    entryData: EntryDTO
): Promise<boolean> {
    const { err } =
        await query(
            "INSERT INTO entry (id, name, user_id) VALUES ($1, $2, $3)",
            [entryData.id, entryData.name, entryData.user_id]
        );

    if (err) {
        console.error(err);

        return false;
    }

    return true;
}

async function updateEntryNameById(
    entryId: string,
    newEntryName: string,
) {
    const { err } =
        await query(`
            UPDATE
                entry
            SET
                name = $1
            WHERE id = $2
            `,
            [newEntryName, entryId]
        );

    if (err)
        console.error(err);
}

// ---- FIELDS -----

async function getAllFieldsByEntry(
    entryId: string
): Promise<FieldDTO[]> {
    const { err, rows } =
        await query(`
            SELECT
                *
            FROM field
            WHERE entry_id = $1
            `,
            [entryId]);

    if (err) {
        console.error(err);

        return [];
    }

    return rows;
}

async function insertNewField(
    fieldInfo: FieldDTO
) {
    const { err } =
        await query(
            "INSERT INTO field (name, value, entry_id) VALUES ($1, $2, $3)",
            [fieldInfo.name, fieldInfo.value, fieldInfo.entry_id]
        );

    if (err)
        console.error(err);
}

async function deleteFieldsFromEntry(
    entryId: string
) {
    const { err } =
        await query(`
            DELETE
            FROM field
            WHERE entry_id = $1
        `,
        [entryId]);

    if (err)
        console.error(err);
}

