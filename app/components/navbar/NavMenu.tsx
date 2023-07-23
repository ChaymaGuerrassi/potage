"use client";

import Button from "../buttons/Button";
import { GoPerson } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { PiBasketDuotone } from "react-icons/pi";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useAnnounceModal from "@/app/hooks/useAnnounceModal";
import { User } from "@prisma/client";
import ProfilPic from "../ProfilPic";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  currentUser?: User | null;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const announceModal = useAnnounceModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    loginModal.onOpen();
  };

  return (
    <>
      <ul className="gap-6 text-xl flex flex-col lg:flex-row items-center justify-center z-10">
        {currentUser && currentUser.userType === "SELLER" ? (
          <>
            <li
              className={`cursor-pointer hover:underline ${
                pathname === "/mes-annonces" && "underline text-ptgBrown"
              }`}
              onClick={() => router.push("/mes-annonces")}
            >
              Mes annonces
            </li>
            <li className={`cursor-pointer hover:underline ${
                pathname === "/demandes-dachat-recues" && "underline text-ptgBrown"
              }`} onClick={() => router.push("/demandes-dachat-recues")}>
              demandes d&#39;achat reçues
            </li>
            <li>
              <Button
                value="Créer une annonce"
                onClick={announceModal.onOpen}
                icon={FaPlus}
                color="Green"
                large
              />
            </li>
            <hr className="lg:hidden" />
            <li>
              {currentUser.name && (
                <ProfilPic name={currentUser.name} showMenu />
              )}
            </li>
          </>
        ) : currentUser && currentUser.userType === "BUYER" ? (
          <>
            <li className={`cursor-pointer hover:underline ${
                pathname === "/mes-demandes-dachat" && "underline text-ptgBrown"
              }`} onClick={() => router.push("/mes-demandes-dachat")}>
              Mes demandes d&#39;achat
            </li>
            <li>
              <Button
                value="Parcourir les annonces"
                onClick={() => router.push("/annonces")}
                icon={PiBasketDuotone}
                color="Green"
                large
              />
            </li>
            <li>
              {currentUser.name && (
                <ProfilPic name={currentUser.name} showMenu />
              )}
            </li>
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
