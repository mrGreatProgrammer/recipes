import RecepyCard from "@/components/RecepytCard";
import { db } from "@/utils/db";

export default async function Home() {

  // const recepies = await db.Recepy.findMany({
  //   include: {
  //     categories: {
  //       include: {
  //         categories: {
  //           select: {
  //             name: true,
  //             id: true,
  //             slug: true,
  //           },
  //         },
  //       },
  //     },
  //     images: true,

  //   },
  // });

  return (
    <main>
      <div className="container mx-auto py-5">
        <div></div>
        <div className="grid grid-cols-5">
          {/* {recepies?.map(item=> <RecepyCard 
{...item}
          />)} */}
          <RecepyCard 
          id={1}
          images={""}
          kkal={200}
          name="hii"
          />
        </div>
      </div>
    </main>
  );
}
