import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ChartRecipe from "@/components/ChartRecipe";
import { db } from "@/utils/db";
import { auth } from "@/auth";
import CommentsContainer from "@/components/CommentsContainer";
import EditResepeForm from "@/components/EditResepeForm";

export default async function RecepeEdit({
  params: { id },
}: {
  params: { id: number };
}) {
  const session = await auth();
  const user = session?.user;

  const resepe = await db.resepe.findFirst({
    where: { id: Number(id) },
    include: {
      images: true,
      // categories: { include: { category: true } },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      categories: {
        include: { category: true },
      },

      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <main>
      <div className="container mx-auto py-10">
        <EditResepeForm {...resepe} />
      </div>
    </main>
  );
}
