"use client";

import Image from "next/image";
import Button from "./components/buttons/Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function Home() {
  const registerModal = useRegisterModal();

  return (
    <main className="flex py-12 px-24">
      <section className="bg-hero-bg w-full bg-right-top bg-contain bg-no-repeat flex min-h-[70vh] items-center">
        <div className="w-1/2">
          <h1 className={"font-extrabold text-8xl"}>
            Stop overpaying for groceries
          </h1>
          <p className="font-medium text-2xl mt-8">
            Get organic produce and sustainably sourced groceries delivered{" "}
            <br /> at
            <span className="font-bold text-ptgOrange"> up to 40%</span> off
            grocery store prices.
          </p>
          <div className="font-extrabold text-2xl mt-12">
            <Button value="Get started" large onClick={registerModal.onOpen} />
          </div>
        </div>
      </section>
    </main>
  );
}
