"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { User } from "next-auth";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  text: z
    .string()
    .min(3, {
      message: "не меньше 3 символов!",
    })
    .max(100, { message: "максимум 100 символов!" }),
});

const CommetnsForm: React.FC<{
  user: User | undefined;
  resepeId: number | undefined;
  setComments: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}> = ({ user, resepeId, setComments }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const r = await fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      body: JSON.stringify({ ...values, userId: user?.id, resepeId }),
    })
      .then((r) => {
        toast({
            title: "Успешно!",
            description: "Рецепт успешно добавлен!",
          });

        return r.json();
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

    setComments((prev: any) => [...prev, r.comment]);
  }

  React.useEffect(() => {}, []);

  return (
    <div className={user ? "opacity-100" : "opacity-70"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-row gap-2.5 items-end"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="w-full resize-none"
                    disabled={!user}
                    placeholder={
                      user
                        ? "Ваш коментарий к данному рецепту..."
                        : "Авторизуйтесь чтобы оставить комментарий!"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!user} type="submit">
            Отправить
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommetnsForm;
