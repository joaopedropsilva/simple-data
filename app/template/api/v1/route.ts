import { getAllTemplates, getAllTemplatesByUser } from "@/models/template";


export async function GET(request: Request) {
    const { userId } = await request.json();

    let result;
    if (!userId) {
        result = await getAllTemplates();
    } else {
        result = await getAllTemplatesByUser(userId);
    }

    if (result.err != "") {
        return new Response(result.err, { status: 404 });
    }

    return new Response(JSON.stringify({ templates: result.payload }));
}

