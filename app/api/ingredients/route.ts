import { db } from "@/utils/db";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const { name, slug } = await request.json();

  const r = await db.ingredient.create({ data: { name: name, slug: slug } });
  //   .then((r) => console.log(r))
  //   .catch((err) => console.error(err));

  return Response.json(r);
}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
  const r = await db.ingredient.findMany();
  //   .then((r) => console.log(r))
  //   .catch((err) => console.error(err));

  return Response.json(r);
}
