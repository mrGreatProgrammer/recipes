import Link from "next/link";
import React from "react";
import FilterSearchForm from "./FilterSearchForm";
import { auth, signOut } from "@/auth";

import { Button } from "./ui/button";
import AuthNav from "./navs/AuthNav";


const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap gap-3 p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Рецепты</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <FilterSearchForm />
        </nav>
        {user ? (
          <AuthNav />
        ) : (
          <div className="space-x-3">
            <Link
              href="/login"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Вход
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Регистрация
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
