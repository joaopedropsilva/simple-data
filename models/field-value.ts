import { z } from "zod";


export const FieldValue = z.object({
    id: z.string(),
    value: z.string(),
    is_computed: z.boolean(),
    entry_id: z.string(),
    template_id: z.string()
});

