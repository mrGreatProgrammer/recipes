import React from "react";
import RecepyCard from "./RecepytCard";
import { db } from "@/utils/db";

interface ResipeisContainerProps {
    searchParams: any;
}

const ResipeisContainer  = async ({searchParams}:ResipeisContainerProps) => {
    // const resipes = await db.Resepe.findMany();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {/* {recepies?.map(item=> <RecepyCard 
{...item}
          />)} */}
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
      <RecepyCard id={1} images={""} kkal={200} name="hii" />
    </div>
  );
};

export default ResipeisContainer;
