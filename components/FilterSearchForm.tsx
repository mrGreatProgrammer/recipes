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
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
        defaultValue={defaultValue}
        name="query"
      />
    </div>
  );
}

const FilterSearchForm: React.FC = () => {
  const [ings, setIngs] = React.useState<Ingredient[] | undefined>();

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
    });
  }, []);

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
      <div className="grid grid-cols-4 gap-2">
        <Search
          placeholder="Поиск..."
          onChange={onChange}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Input
          name="kkalStart"
          placeholder="ккалории от"
          onChange={(e) => {
            onChange(e.target.name, e.target.value);
          }}
          defaultValue={searchParams.get("kkalStart")?.toString()}
          type="number"
        />
        <Input
          name="kkalEnd"
          placeholder="ккалории до"
          onChange={(e) => {
            onChange(e.target.name, e.target.value);
          }}
          defaultValue={searchParams.get("kkalEnd")?.toString()}
          type="number"
        />
        <div className="flex flex-col space-y-1.5">
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
