"use client";
import React from "react";
import CommentsList from "./CommentsList";
import CommetnsForm from "./CommetnsForm";
import { User } from "next-auth";

const CommentsContainer: React.FC<{
  user: User | undefined;
  comments: any[] | undefined;
  resepeId: number | undefined;
}> = ({ comments, user, resepeId }) => {
    const [commentsData, setComments] = React.useState(comments);

  return (
    <div>
      <CommentsList user={user} comments={commentsData} />
      <CommetnsForm user={user} resepeId={resepeId} setComments={setComments} />
    </div>
  );
};

export default CommentsContainer;
