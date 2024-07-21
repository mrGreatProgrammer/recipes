"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ingredient, Category } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string({ message: "объязательное поле" }).min(3, {
    message: "Название должно быть не меньше трех букв",
  }),
  carbs: z.string({ message: "объязательное поле" }),
  categories: z.any(),
  cookTimer: z.string({ message: "объязательное поле" }),
  description: z
    .string({ message: "объязательное поле" })
    .min(10, { message: "Минимум 10 символа" }),
  fat: z.string({ message: "объязательное поле" }),
  kkal: z.string({ message: "объязательное поле" }),
  protein: z.string({ message: "объязательное поле" }),
  totalWeight: z.string({ message: "объязательное поле" }),

  ingredients: z
    .array(
      z.object({
        id: z.string({ message: "объязательное поле" }),
        count: z.string({ message: "объязательное поле" }),
        weight: z.string({ message: "объязательное поле" }),
      })
    )
    .nonempty({ message: "объязательное поле" }),
});

export default function CreateRecepe() {
  const [images, setImages] = React.useState<any>(null);
  const [ings, setIngs] = React.useState<Ingredient[] | undefined>();
  const [categories, setCategories] = React.useState<Category[] | undefined>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "images", images);
    fetch(`/api/receipe`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((r) => {
        toast({
          title: "Успешно!",
          description: "Рецепт успешно добавлен!",
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Ошибка!",
          description: "Ошибка при добавлении рецепта!",
        });
      })
      .finally(() => {
        form.reset();
      });
  }

  React.useEffect(() => {
    fetch(`/api/ingredients`, {
      method: "OPTIONS",
    })
      .then((r) => {
        r.json().then((res) => {
          setIngs(res);
          console.log("rr", res);
        });
      })
      .catch((err) => console.error(err));
    fetch(`/api/category`, {
      method: "OPTIONS",
    })
      .then((r) => {
        r.json().then((res) => setCategories(res));
      })
      .catch((err) => console.error(err));
  }, []);

  const { fields, append } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  return (
    <main>
      <div className="container mx-auto py-10">
        <div className="flex flex-row items-center justify-between my-10">
          <h1 className="text-3xl font-semibold ">Добавить рецепт</h1>{" "}
          <Link
            href={"/reciepe/attrs"}
            className="border-primary border text-primary py-1.5 px-4 rounded hover:bg-primary hover:text-white duration-300"
          >
            Добавить атрибуты
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  onChange={(event) => {
                    console.log("imgs", event.target.files);
                    setImages(event);
                  }}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название рецепта</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категории</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((e) => (
                          <SelectItem key={e.id} value={`${e.id}`}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Жиры</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Белки</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Углеводы</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cookTimer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время приготовления</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kkal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Кило-калории на 100 грамм</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Общая масса</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описания</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card>
              <CardHeader className="">
                <CardTitle>Ингридиенты</CardTitle>
              </CardHeader>
              <CardContent className="">
                {fields.map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-5 border-b border-slate-500 py-5"
                    >
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`ingredients.${index}.id`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ингредиент</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ings?.map((e) => (
                                  <SelectItem key={e.id} value={`${e.id}`}>
                                    {e.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`ingredients.${index}.count`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Количество</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={`ingredients.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Вес</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </CardContent>

              <CardFooter>
                <Button
                  className="my-5"
                  onClick={(e) => {
                    e.preventDefault();
                    append({ id: "", count: "0", weight: "0" });
                  }}
                >
                  Добавить ингридиент
                </Button>
              </CardFooter>
            </Card>

            <Button type="submit">Опубликовать рецепт</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
