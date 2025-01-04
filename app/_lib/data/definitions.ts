import { z } from "zod";


export const User = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    created_at: z.date()
});


export const Template = z.object({
    id: z.string(),
    name: z.string(),
    user_id: z.string()
});

export const Entry = z.object({
    id: z.string(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    template_id: z.string()
});

export const FieldValue = z.object({
    id: z.string(),
    value: z.string(),
    is_computed: z.boolean(),
    entry_id: z.string(),
    template_id: z.string()
});

export const Field = z.object({
    id: z.string(),
    name: z.string()
});

