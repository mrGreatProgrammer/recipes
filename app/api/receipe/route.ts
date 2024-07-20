import { db } from "@/utils/db";

export async function GET(request: Request) {
  const { query, kkalStart, kkalEnd, cookTimeStart, cookTimeEnd } =
    await request.json();

  const resepes = await db.resepe.findMany({
    include: {
      images: true,
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        {
          ingredients: {
            some: {
              ingredient: { name: { contains: query, mode: "insensitive" } },
            },
          },
        },
        { kkal: { gte: kkalStart, lte: kkalEnd } },
        { cookTimer: { gte: cookTimeStart, lte: cookTimeEnd } },
      ],
    },
  });

  return Response.json(resepes);
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const {
    name,
    description,
    cookTimer,
    kkal,
    fat,
    carbs,
    protein,
    totalWeight,
    categories,
    images,
    ingredients,
  } = await request.json();

  const ings = ingredients.map(
    (e: { id: number; weight: number; count: number }) => {
      return {
        ingredientId: Number(e.id),
        weight: Number(e.weight),
        count: Number(e.count),
      };
    }
  );

  const resepe = await db.resepe.create({
    data: {
      carbs: Number(carbs),
      cookTimer,
      description,
      fat: Number(fat),
      kkal: Number(kkal),
      name,
      protein: Number(protein),
      totalWeight: Number(totalWeight),
      categories: {
        create: {
          categoryId: Number(categories),
        },
      },
      ingredients: { createMany: { data: ings } },
    },
  });


  return Response.json({ message: "Успешно добавленно!", resepe, ings });
}