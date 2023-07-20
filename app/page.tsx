"use client";

import Image from "next/image";
import Button from "./components/buttons/Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function Home() {
  const registerModal = useRegisterModal();

  return (
    <main className="flex p-9 md:py-12 md:px-24">
      <section className="w-full flex flex-col md:flex-row min-h-[87vh] md:min-h-[70vh] items-start md:items-center">
        <div className="w-full flex flex-col gap-4">
          <h1 className={"font-extrabold lg:text-8xl md:text-6xl text-5xl"}>
            Mieux manger, <br className="hidden md:block" /> plus facilement.
          </h1>
          <p className="font-medium lg:text-2xl md:text-xl md:mt-8 text-lg">
            Découvrez ça potage, la plateforme qui met en relation les petits
            jardiniers avec des acheteurs locaux, pour une vente de
            <span className="font-bold text-ptgOrange">
              {" "}
              produits frais et durables{" "}
            </span>{" "}
            près de chez vous.
          </p>
          <div className="font-extrabold text-2xl md:text-xl mt-12 hidden lg:block">
            <Button value="Découvrir !" large onClick={registerModal.onOpen} />
          </div>
          <div className="font-extrabold text-xl md:text-xl mt-4 lg:hidden">
            <Button value="Découvrir !" onClick={registerModal.onOpen} />
          </div>
        </div>
        <div className="bg-hero-bg w-full h-full bg-bottom md:bg-right-top bg-contain bg-no-repeat"></div>
      </section>
    </main>
  );
}
