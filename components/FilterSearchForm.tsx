"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Ingredient } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

function Search({
  placeholder,
  onChange,
  defaultValue,
}: {
  placeholder: string;
  onChange: (n: string, v: string) => void;
  defaultValue?: string;
}) {
  return (
    <div className="">
      <Label htmlFor="search" className="sr-only">
        Поиск
      </Label>
      <Input
        // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
        defaultValue={defaultValue}
        name="query"
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}

const FilterSearchForm: React.FC = () => {
  const [ings, setIngs] = React.useState<Ingredient[] | undefined>();
  const { toast } = useToast();

  React.useEffect(() => {
    const res = fetch(`http://localhost:3000/api/ingredients`, {
      method: "OPTIONS",
    })
      .then((r) => {
        return r.json();
      })

      .catch((err) => console.error(err));

    res.then((r) => {
      setIngs(r);
      toast({
        description: "Your message has been sent.",
      });
    });
  }, []);
  //   const [searchText, setSearchText] = useState('');
  //   const [category, setCategory] = useState('all');
  //   const router = useRouter();
  //   const prisma = usePrismaClient();

  //   useEffect(() => {
  //     const updateSearchParams = () => {
  //       const searchParams = new URLSearchParams({
  //         searchText,
  //         category,
  //       });
  //       router.push(`/products?${searchParams.toString()}`);
  //     };

  //     updateSearchParams();
  //   }, [searchText, category]);

  //   useEffect(() => {
  //     const handleSearchParamsChange = () => {
  //       const searchParams = new URLSearchParams(window.location.search);
  //       setSearchText(searchParams.get('searchText') || '');
  //       setCategory(searchParams.get('category') || 'all');
  //     };

  //     window.addEventListener('popstate', handleSearchParamsChange);
  //     return () => window.removeEventListener('popstate', handleSearchParamsChange);
  //   }, []);

  //   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchText(event.target.value);
  //   };

  //   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     setCategory(event.target.value);
  //   };

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     // const products = await prisma.product.findMany({
  //     //   where: {
  //     //     OR: [
  //     //       { name: { contains: searchText } },
  //     //       { description: { contains: searchText } },
  //     //     ],
  //     //     category: category,
  //     //   },
  //     // });

  //     // Отобразите результаты запроса
  //   };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function onChange(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Search
          placeholder="Поиск..."
          onChange={onChange}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Input
          name="kkal"
          placeholder="ккалории"
          onChange={(e) => {
            onChange(e.target.name, e.target.value);
          }}
          defaultValue={searchParams.get("kkal")?.toString()}
          type="number"
        />
        <div className="flex flex-col space-y-1.5">
          {/* <Label htmlFor="ingredients">Ингридиенты</Label> */}
          <Select
            name="ingredients"
            defaultValue={searchParams.get("ingredients")?.toString()}
            onValueChange={(v) => {
              onChange("ingredients", v);
            }}
          >
            <SelectTrigger id="ingredients">
              <SelectValue placeholder="Ингридиенты" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ings?.map((e) => (
                <SelectItem key={`${e.name}-${e.id}`} value={`${e.id}`}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default FilterSearchForm;
