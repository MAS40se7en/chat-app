import { db } from "@/lib/db";

export async function DELETE(req: Request) {
    const data = await req.json();

    const { id } = data;
    
    console.log(id)

    try {
        const deletedCount = await db.del(`user:${id}`);
        
        if (deletedCount === 0) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        console.log(error)
    }
}