import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies(); // <-- await once

    cookieStore.getAll().forEach(cookie => {
        cookieStore.set({
            name: cookie.name,
            value: "",
            path: "/",
            expires: new Date(0) // expire immediately
        });
    });

    return new Response("Cookies cleared");
}
