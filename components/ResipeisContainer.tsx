import React from "react";
import RecepyCard from "./RecepytCard";
import { db } from "@/utils/db";

interface ResipeisContainerProps {
  searchParams: any;
}

const ResipeisContainer = async ({ searchParams }: ResipeisContainerProps) => {
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
        { name: { contains: searchParams.query, mode: "insensitive" } },
        { description: { contains: searchParams.query, mode: "insensitive" } },
        {
          ingredients: {
            some: {
              ingredient: {
                name: { contains: searchParams.query, mode: "insensitive" },
              },
            },
          },
        },
        { kkal: { gte: searchParams.kkalStart, lte: searchParams.kkalEnd } },
        {
          cookTimer: {
            gte: searchParams.cookTimeStart,
            lte: searchParams.cookTimeEnd,
          },
        },
      ],
    },
  });

  return (
    <>
      {resepes ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {resepes?.map((e) => (
            <RecepyCard
              key={e.id}
              id={e.id}
              images={e.images}
              kkal={e.kkal}
              name={e.name}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center text-2xl font-semibold">
          Пусто
        </div>
      )}
    </>
  );
};

export default ResipeisContainer;
