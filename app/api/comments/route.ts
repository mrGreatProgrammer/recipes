import { db } from "@/utils/db";

export async function GET(request: Request) {
  const { resepeId } = await request.json();

  const comments = await db.comment.findMany({
    include: {
      user: true,
    },
    where: { id: resepeId },
  });

  return Response.json(comments);
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const { text, userId, resepeId } = await request.json();

  const comment = await db.comment.create({
    data: {
      text,
      user_id: userId,
      resepe_id: resepeId,

      // resepe:{
      //     create: {

      //     }
      // }

      // user: {

      // },
    },
  });

  return Response.json({ message: "Успешно добавленно!", comment });
}
