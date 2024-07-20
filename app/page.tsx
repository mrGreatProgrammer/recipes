import ResipeisContainer from "@/components/ResipeisContainer";
import SkeletonProductsContainer from "@/components/SkeletonProductsContainer";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  console.log("searchParams---", searchParams);

  return (
    <main>
      <div className="container mx-auto py-5">
        <div></div>
        <Suspense
          key={query + currentPage}
          fallback={<SkeletonProductsContainer />}
        >
          <ResipeisContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
