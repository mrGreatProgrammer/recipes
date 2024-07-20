import React from "react";
import RecepyCard from "./RecepytCard";
import { db } from "@/utils/db";

interface ResipeisContainerProps {
    searchParams: any;
}

const ResipeisContainer  = async ({searchParams}:ResipeisContainerProps) => {
    // const resipes = await db.Resepe.findMany();
    // const recepes = await db.resepe.findMany({
    //     // include: {
    //     //   categories: {
    //     //     include: {
    //     //       categories: {
    //     //         select: {
    //     //           name: true,
    //     //           id: true,
    //     //           slug: true,
    //     //         },
    //     //       },
    //     //     },
    //     //   },
    //     //   images: true,
    
    //     // },
    //   });

    //   console.log("r", recepes);

    // const resepes = await db.resepe.findMany({
    //     include: {
    //       images: true,
    //       categories: true,
    //       ingredients: {
    //         include: {
    //           ingredient: true,
    //         },
    //       },
    //     },
    //   })
    
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
                  ingredient: { name: { contains: searchParams.query, mode: "insensitive" } },
                },
              },
            },
            { kkal: { gte: searchParams.kkalStart, lte: searchParams.kkalEnd } },
            { cookTimer: { gte: searchParams.cookTimeStart, lte: searchParams.cookTimeEnd } },
          ],
        },
      });
    


      console.log("------------", resepes)
      

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {/* {recepies?.map(item=> <RecepyCard 
{...item}
          />)} */}
      {resepes?.map(e=><RecepyCard id={e.id} images={""} kkal={e.kkal} name={e.name} />)}
    </div>
  );
};

export default ResipeisContainer;
