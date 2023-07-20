"use client";

import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { useCallback, useState } from "react";
import { User } from "@prisma/client";
import NavMenu from "./NavMenu";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <nav className="py-5 pr-7 md:py-8 md:pl-20 md:pr-24 font-bold flex justify-between items-center">
      <a href="/">
        <Image
          width={200}
          height={23}
          alt="Logo ça potage"
          src={"/assets/logo/logo.svg"}
        />
      </a>
      <div className="hidden lg:block">
        <NavMenu currentUser={currentUser} />
      </div>
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
            w-[72%]
            h-fit
            md:w-fit
            bg-ptgBeige
            overflow-hidden 
            right-20
            top-20
            text-sm
            p-4
            pt-5
          "
        >
          <NavMenu currentUser={currentUser} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
