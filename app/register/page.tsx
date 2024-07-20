import { RegisterForm } from "@/components/RegisterForm";
import { Suspense } from "react";

export default async function Register() {
  return (
    <main>
      <div className="container mx-auto py-5">
        <Suspense fallback={<>Loading...</>}>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
