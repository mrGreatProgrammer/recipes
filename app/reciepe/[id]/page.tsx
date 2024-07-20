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

const categories = ["a", "da"];
const ingredients = [
  { name: "wings", count: 23, weight: 0 },
  { name: "dfa", count: 0, weight: 2 },
  { name: "fsdfsds", count: 23, weight: 0 },
];
const name = "chicken";
const description = "fasdffd dasf";

export default async function Recepe({
  params: { id },
}: {
  params: { id: number };
}) {
  const resepe = await db.resepe.findFirst({
    where: { id: Number(id) },
    include: {
      images: true,
      categories: { include: { category: true } },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  console.log("res", resepe);

  return (
    <main>
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-24">
          {resepe?.images?.length ? (
            <Carousel className="w-full lg:w-1/3">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center">
                          <Image
                            width={300}
                            height={300}
                            alt="ecommerce"
                            className=" w-full lg:h-auto h-64 object-cover object-center rounded"
                            src="https://github.com/shadcn.png"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <Card className="w-full lg:w-1/3">
              <CardContent className="flex aspect-square items-center justify-center">
                <Image
                  width={300}
                  height={300}
                  alt="ecommerce"
                  className=" w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="https://github.com/shadcn.png"
                />
              </CardContent>
            </Card>
          )}
          <div>
            {resepe?.categories &&
              resepe?.categories?.map((e) => (
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {e.category.name}
                </h2>
              ))}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {name}
            </h1>
            <div>
              <p className="text-base text-gray-700">{description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start md:justify-between my-8 gap-10">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold mb-5">Ингредиенты</h3>
            <ul>
              {resepe?.ingredients &&
                resepe?.ingredients?.map((e) => (
                  <li className="flex flex-row justify-between items-center border-b py-3">
                    <span>{e.ingredient.name}</span>
                    <span className="decoration-dot decoration-pink-500"></span>
                    <span>
                      {e.weight}мг {e.count}шт
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="chart-container md:w-1/2">
            <ChartRecipe />
          </div>
        </div>
        <div>comments</div>
      </div>
    </main>
  );
}
