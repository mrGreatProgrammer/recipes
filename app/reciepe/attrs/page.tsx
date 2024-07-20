"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IRecepy } from "@/types/app";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

const formShema = z.object(
  /* <IRecepy> */ {
    name: z.string().min(3, {
      message: "Название должно быть не меньше трех букв",
    }),
    slug: z.string(),
  }
);

export default function CreateAttrs() {
  

  const formCategories = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
    },
  });
  const formIng = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmitCategory(values: z.infer<typeof formShema>) {
    console.log(values);
    fetch(`http://localhost:3000/api/category`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((r) => {
        toast.success('Категория успешно добавлено!');
      })
      .catch((err) => console.error(err));
  }
  function onSubmitIng(values: z.infer<typeof formShema>) {
    fetch(`http://localhost:3000/api/ingredients`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((r) => {
        toast.success('Ингридиент успешно добавлен!');
      })
      .catch((err) => {console.error(err); toast.error('Ошибка пожалуйста попробуйте позже!');});
  }

  return (
    <main>
      
      <div className="container mx-auto py-5">
        <h1 className="text-3xl font-semibold mb-5">Добавить новые атрибуты</h1>
        <Card className="flex flex-col my-5 py-5">
          <CardHeader className="">
            <CardTitle>Добавить новую категорию</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Form {...formCategories}>
              <form
                onSubmit={formCategories.handleSubmit(onSubmitCategory)}
                className="space-y-8"
              >
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={formCategories.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название категории</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCategories.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Слаг</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Добавить категорию</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="flex flex-col my-5 py-5">
          <CardHeader className="">
            <CardTitle>Добавить новый ингридиент</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Form {...formIng}>
              <form
                onSubmit={formIng.handleSubmit(onSubmitIng)}
                className="space-y-8"
              >
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={formIng.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название ингридиента</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formIng.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Слаг</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Добавить ингридиент</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
