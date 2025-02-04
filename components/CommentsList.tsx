import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { User } from "next-auth";
import { Comment } from "@prisma/client";
import moment from "moment";

const CommentsList = ({
  user,
  comments,
}: {
  user: User | undefined;
  comments: any[] | undefined;
}) => {
  return (
    <div>
      <h3 className="text-2xl my-5">Комментарии</h3>
      <div className="max-h-[450px] overflow-y-auto flex flex-col my-5">
        {comments ? (
          comments.map((e) => (
            <Card
              key={e.id}
              className={
                e?.user_id === user?.id
                  ? `bg-blue-500 text-white self-end max-w-[350px]`
                  : `text-white bg-blue-700 self-start max-w-[350px]`
              }
            >
              <CardHeader className="flex flex-row justify-between py-4">
                <CardTitle className="mr-8">{e?.user?.name} </CardTitle>
                <p className="text-xs font-light">
                  {moment(e?.createdAt).format("YYYY-MM-DD HH:mm")}
                </p>
              </CardHeader>
              <CardContent className="">
                <CardDescription className="text-white">
                  {e?.text}
                </CardDescription>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-xl">Нет комментарий</p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
