"use client";

import Image from "next/image";
import Button from "./components/buttons/Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Footer from "@/app/components/Footer";

export default function Home() {
  const registerModal = useRegisterModal();

  let section2 = [
    {
      icon: "/assets/potage-illustration-1.svg",
      title: "Rejoignez gratuitement",
      content:
        "Créer votre compte acheteur, vendeur ou les deux sur ça potage en toute simplicité.",
    },
    {
      icon: "/assets/potage-illustration-2.svg",
      title: "Shoppez ou vendez",
      content:
        "Créez vos annonces de produits frais, locaux et de saison en quelques clics. Vous pouvez aussi faire des demandes d'achat sur des annonces qui vous donnent envie.",
    },
    {
      icon: "/assets/potage-illustration-3.svg",
      title: "Et profitez !",
      content:
        "Les jardiniers locaux vous contactent pour vous proposer leurs produits. Vous pouvez ensuite discuter avec eux pour organiser la vente. et dégustez !",
    },
  ];

  return (
    <main className="p-9 md:py-12 md:px-24">
      <section className="mb-20 lg:mb-28 w-full flex flex-col md:flex-row min-h-[87vh] md:min-h-[70vh] items-start md:items-center">
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
        <div className="bg-hero-bg w-full min-h-[520px] lg:min-h-[660px] bg-right-top bg-contain bg-no-repeat"></div>
      </section>
      <section className="mb-20 lg:mb-28 flex justify-between items-center bg-ptgRed py-4  uppercase text-ptgBeige px-3 w-full flex-wrap">
        <p className="font-bold text-2xl">viandes</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">miels</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">fleurs</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">fruits</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">légumes frais</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">oeufs</p>
        <p className="font-bold text-2xl">·</p>
        <p className="font-bold text-2xl">Produits laitiers</p>

      </section>
      <section className="mb-20 lg:mb-28 text-xl">
        <h2 className="font-extrabold text-4xl lg:text-6xl text-center">
          Comment ça marche ?
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center mt-8 lg:mt-20 gap-4">
          {section2.map((elem) => {
            return (
              <div key={elem.title} className="flex flex-col gap-3 items-center justify-center lg:items-start lg:w-1/3 text-center lg:text-left">
                <Image
                  className=""
                  width={200}
                  height={200}
                  src={elem.icon}
                  alt={elem.icon}
                />
                <div>
                  <h3 className="font-bold text-2xl">{elem.title}</h3>
                  <p className="lg:max-w-[70%] mt-6">{elem.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
