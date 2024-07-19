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

const categories = ["a", "da"];
const ingredients = [
  { name: "wings", count: 23, weight: 0 },
  { name: "dfa", count: 0, weight: 2 },
  { name: "fsdfsds", count: 23, weight: 0 },
];
const name = "chicken";
const description = "fasdffd dasf";

export default function Recepe() {
  return (
    <main>
      <div className="container mx-auto py-10">
        {/* <Image
              width={300}
              height={100}
              alt="ecommerce"
              className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://github.com/shadcn.png"
            /> */}
        <div className="flex flex-col md:flex-row gap-24">
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
          <div>
            {categories.map((t: string) => (
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {t}
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
              {ingredients.map((e: any) => (
                <li className="flex flex-row justify-between items-center border-b py-3">
                  <span>{e.name}</span>
                  <span className="decoration-dot decoration-pink-500"></span>
                  <span>
                    {e.weight}
                    {e.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="chart-container md:w-1/2">
            <ChartRecipe />
          </div>
        </div>
        <div>
          comments
        </div>
      </div>
    </main>
  );
}
