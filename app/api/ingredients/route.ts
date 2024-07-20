import { db } from "@/utils/db";

export async function POST(request: Request) {
  const { name, slug } = await request.json();

  const r = await db.ingredient.create({ data: { name: name, slug: slug } });

  return Response.json(r);
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
  const r = await db.ingredient.findMany();

  return Response.json(r);
}
