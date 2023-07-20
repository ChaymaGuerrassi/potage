"use client";

import Button from "../buttons/Button";
import { GoPerson } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { BsFillBasketFill } from "react-icons/bs";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import ProfilPic from "../ProfilPic";

interface NavMenuProps {
  currentUser?: User | null;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const handleLogin = () => {
    loginModal.onOpen();
  };

  return (
    <>
      <ul className="gap-6 text-xl flex flex-col lg:flex-row items-center justify-center z-10">
        {currentUser && currentUser.userType === "SELLER" ? (
          <>

            <li className="cursor-pointer hover:underline">Mes annonces</li>
            <li className="flex gap-2 cursor-pointer hover:underline">
              demandes d&#39;achat
            </li>
            <li>
              <Button
                value="Créer une annonce"
                onClick={registerModal.onOpen}
                icon={FaPlus}
                color="Green"
                large
              />
            </li>
            <hr className="lg:hidden"/>
            <li>{currentUser.name && <ProfilPic name={currentUser.name} />}</li>
          </>
        ) : currentUser && currentUser.userType === "BUYER" ? (
          <>
            <li className="flex gap-2 cursor-pointer hover:underline">
              Mes demandes d&#39;achat
            </li>
            <li>
              <Button
                value="Parcourir les annonces"
                onClick={registerModal.onOpen}
                icon={BsFillBasketFill}
                color="Green"
                large
              />
            </li>
            <li>{currentUser.name && <ProfilPic name={currentUser.name} />}</li>
          </>
        ) : (
          <>
            <li className="cursor-pointer hover:underline">À propos</li>
            <li
              className="flex gap-2 cursor-pointer hover:underline"
              onClick={handleLogin}
            >
              <GoPerson size={18} /> Connexion
            </li>
            <li>
              <Button
                value="Inscription"
                onClick={registerModal.onOpen}
                large
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default NavMenu;
