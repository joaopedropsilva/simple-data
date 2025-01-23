"use server";

import { query } from "@/_lib/database";
import { z } from "zod";

export interface EntryDTO {
    id: string;
    name: string;
    user_id: string;
    created_at?: string;
}

export interface FieldDTO {
    id?: string;
    name: string;
    value: string;
    entry_id: string;
}

const clientFieldDataSchema = z.object({
    id: z.string(),
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

function mapRowsToEntryDTO(rows: any): EntryDTO[] {
    return rows
        .map((r: any) => ({
            id: r.id,
            name: r.name,
            user_id: r.user_id,
            created_at: r.created_at.toISOString()
        } as EntryDTO));
}

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

    return mapRowsToEntryDTO(rows)[0];
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

    return mapRowsToEntryDTO(rows);
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

function mapRowsToFieldDTO(rows: any): FieldDTO[] {
    return rows
        .map((r: any) => ({
            id: r.id,
            name: r.name,
            value: r.value,
            entry_id: r.entry_id
        } as FieldDTO));
}

export async function getAllFieldsByEntry(
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

    return mapRowsToFieldDTO(rows);
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

