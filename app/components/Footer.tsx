import Image from "next/image";
import Navbar from "./navbar/Navbar";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className={`bg-ptgBeige text-ptgGrey border-t-2 border-ptgGrey`}>
      <div
        className={`px-6 lg:px-20 lg:pt-14 lg:pb-8 py-9 flex flex-col lg:flex-row justify-between gap-9 lg:gap-0`}
      >
        <div>
          <Image
            src="/assets/logo/logo.svg"
            alt="Ça potage"
            width={200}
            height={40}
            className={`max-h-[40px] max-w-[200px] w-auto`}
          />
          <Image
            src="/assets/footer-fruits.svg"
            alt="Ça potage"
            width={200}
            height={40}
            className={`max-h-[200px] max-w-[200px] w-auto bg-hero-bg bg-contain bg-no-repeat mt-4 hidden lg:block`}
          />
        </div>

        <div className={`flex justify-between lg:w-1/3`}>
          {/* <Navbar /> */}
        </div>
        <div className={`lg:w-1/3 md:flex md:justify-between md:flex-col`}>
          <div className={`mb-8 lg:mb-6 ml-4 lg:ml-0 text-base md:text-xl`}>
            <p>
              Découvrez ça potage, la plateforme qui met en relation les petits
              jardiniers avec des acheteurs locaux, pour une vente de{" "}
              <span className="font-bold text-ptgOrange">
                {" "}
                produits frais et durables{" "}
              </span>{" "}
              près de chez vous.
            </p>
          </div>
          <div className={`flex gap-[18px] ml-4 lg:ml-0 md:self-center`}>
            <a href={"blank"}>
              <BsFacebook size={24} className="text-ptgBlue" />
            </a>
            <a href={"https://www.linkedin.com/in/chayma-guerrassi-33964312b/"}>
              <BsLinkedin size={24} className="text-ptgOrange" />
            </a>
            <a href={"https://github.com/ChaymaGuerrassi"}>
              <BsGithub size={24} className="text-ptgGreen" />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`mx-4 border-t border-ptgGrey h-10 flex justify-center items-center lg:mx-20 md:text-lg`}
      >
        <a href={"blank"}>
          Tous droits réservés 2023 | ça potage | © Copyright{" "}
        </a>
      </div>
    </footer>
  );
}
