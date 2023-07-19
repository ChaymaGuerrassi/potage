"use client";

import Image from "next/image";
import Button from "../buttons/Button";
import { GoPerson } from "react-icons/go";
import { HiOutlineMenu } from "react-icons/hi";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleButton = () => {
    registerModal.onOpen;
  };

  return (
    <nav className="py-8 pl-20 pr-24 font-bold flex justify-between items-center">
      <Image
        width={200}
        height={23}
        alt="Logo ça potage"
        src={"/assets/logo/logo.svg"}
      />
      <ul className="gap-6 text-xl hidden lg:flex">
        <li>À propos</li>
        <li className="flex gap-2">
          <GoPerson size={18} /> Connexion
        </li>
        <li>
          <Button value="Get started" onClick={registerModal.onOpen} large/>
        </li>
      </ul>
      <div
        className="block md:block lg:hidden cursor-pointer"
        onClick={toggleOpen}
      >
        <HiOutlineMenu size={40} />
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-screen
            h-screen
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <ul className="flex gap-6 text-xl">
            <li>À propos</li>
            <li className="flex gap-2">
              <GoPerson size={18} /> Connexion
            </li>
            <li>
              <Button value="Get started" onClick={registerModal.onOpen} large/>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
