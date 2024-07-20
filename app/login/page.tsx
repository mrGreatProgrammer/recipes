import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";

export default async function Login() {
  return (
    <main>
      <div className="container mx-auto py-5">
        <Suspense fallback={<>Loading...</>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
