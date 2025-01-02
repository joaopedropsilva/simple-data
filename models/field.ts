import { z } from "zod";


export const Field = z.object({
    id: z.string(),
    name: z.string()
});

