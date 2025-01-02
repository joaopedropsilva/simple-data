import { z } from "zod";


export const Entry = z.object({
    id: z.string(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    template_id: z.string()
});

