"use client";
import React from "react";
import { BookPlus, ClipboardPlus, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "next-auth";
import { signOut } from "@/auth";
import Link from "next/link";

const AuthNav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Профиль
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 mx-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup>
          <DropdownMenuItem>
            <Link
              href="/reciepe"
              className="inline-flex items-center  focus:outline-none text-base mt-4 md:mt-0"
            >
              <ClipboardPlus className="mr-2 h-4 w-4" />
              <span>Добавить рецепт</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="my-3">
            <Link
              href="/reciepe/attrs"
              className="inline-flex items-center  focus:outline-none text-base mt-4 md:mt-0"
            >
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Добавить атрибуты</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({redirectTo:"/", redirect: true})}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
