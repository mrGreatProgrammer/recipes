import { db } from "@/utils/db";

export async function GET(request: Request) {}

export async function DELETE(request: Request) {}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const data = await request.json();

  const ings = data.ingredients.map(
    (e: { id: number; weight: number; count: number }) => {
      return {
        ingredientId: Number(e.id),
        weight: Number(e.weight),
        count: Number(e.count),
      };
    }
  );
  const categories = [data.categories];

  const resepe = await db.resepe.update({
    where: { id: Number(id) },
    data: {
      ...data,
      ingredients: {
        upsert: ings.map((ingredient: any) => ({
          where: { id: parseInt(ingredient.ingredientId) },
          update: {
            count: parseInt(ingredient.count),
            weight: parseFloat(ingredient.weight),
          },
          create: {
            count: parseInt(ingredient.count),
            weight: parseFloat(ingredient.weight),
            ingredient: {
              connect: { id: parseInt(ingredient.ingredientId) },
            },
          },
        })),
      },

      categories: {
        upsert: categories.map((categoryId:string) => ({
          where: { id:  Number(categoryId)},
          update: {},
          create: {
            category: {
              connect: { id: Number(categoryId) },
            },
          },
        })),
      },

    },
  });

  return Response.json({
    message: "Успешно добавленно!",
    data,
    ings,
    id,
    resepe,
  });
}
