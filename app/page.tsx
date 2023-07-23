"use client";

import Image from "next/image";
import Button from "./components/buttons/Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Footer from "@/app/components/Footer";

export default function Home() {
  const registerModal = useRegisterModal();

  let section2 = [
    {icon : '#',
     title: 'Rejoignez gratuitement',
     content: 'C\'est payant de magasiner avec nous. Vous pouvez économiser jusqu\'à 1 200 $ chaque année sur des articles d\'épicerie de haute qualité.'},
    {icon : '#',
     title: 'Rejoignez gratuitement',
     content: 'C\'est payant de magasiner avec nous. Vous pouvez économiser jusqu\'à 1 200 $ chaque année sur des articles d\'épicerie de haute qualité.'},
    {icon : '#',
     title: 'Rejoignez gratuitement',
     content: 'C\'est payant de magasiner avec nous. Vous pouvez économiser jusqu\'à 1 200 $ chaque année sur des articles d\'épicerie de haute qualité.'}
  ]

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
        <div className="bg-hero-bg w-full min-h-[520px] lg:min-h-[660px] bg-bottom md:bg-right-top bg-contain bg-no-repeat"></div>
      </section>
      <section className="mb-20 lg:mb-28 flex justify-between items-center">
        {section2.map(elem => {
          return (
              <div key={elem.title} className="flex items-start">
                <img className="pr-5" width={30} height={30} src={elem.icon} alt={elem.icon} />
                <div>
                  <h3 className="mr-5 font-bold">{elem.title}</h3>
                  <p className="mt-4">
                    {elem.content}
                  </p>
                </div>
              </div>
          )
        })}
      </section>
        <section className="mb-20 lg:mb-28 flex justify-between items-center">
            <div>
                <img src="#" alt="" width="" height="" className=""/>
            </div>
            <div>
                <p className="text-3xl font-bold mb-8">Tous les aliments sont bons</p>
                <p className="text-xl ">Les normes obsolètes des épiceries signifient que des aliments parfaitement
                    nutritifs sont gaspillés, ce qui contribue au changement climatique. Nous préférons vous offrir une
                    réduction sur des articles délicieux et amusants et donner à ces marginaux une nouvelle maison : la vôtre.</p>
            </div>
        </section>
    </main>
  );
}
