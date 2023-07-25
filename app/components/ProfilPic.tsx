import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import { User } from "@prisma/client";
import Image from "next/image";

interface ProfilPicProps {
  currentUser: User;
  showMenu?: boolean;
  large?: boolean;
}

const ProfilPic: React.FC<ProfilPicProps> = ({ currentUser, showMenu, large }) => {
  const [profilMenu, setProfilMenu] = useState(false);
  const router = useRouter();


  const handleProfilClick = () => {
    if (!showMenu) {
      router.push(`/profile/${currentUser.id}`);
    } else {
      setProfilMenu(!profilMenu);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center lg:block">
      <div
        className={`rounded-full border-2 w-[52px] h-[52px] ${large && "w-20 h-20" } border-ptgGrey leading-none bg-slate-300 flex items-center justify-center relative cursor-pointer`}
        onClick={handleProfilClick}
      >
        {currentUser && currentUser.image !== null ? (
          <Image
            src={currentUser.image}
            alt="profil picture"
            fill
            className="rounded-full"
          />
        ) : currentUser && currentUser.name !== null && (
          <p className={`font-bold ${large && 'text-2xl'}`}>
            {currentUser.name.split(" ")[0][0]}
            {currentUser.name.split(" ")[1] &&
              currentUser.name.split(" ")[1][0]}
          </p>
        )}

        {showMenu && profilMenu && (
          <div className="absolute top-2 right-2 mt-12 w-[200px] bg-ptgBeige rounded-md shadow-lg hidden lg:block border-2 border-ptgGrey">
            <ul className="flex flex-col">
              <li
                className="p-4  hover:underline"
                onClick={() => router.push(`/profile/${currentUser.id}`)}
              >
                Profile
              </li>
              <li
                className="p-4  hover:underline text-ptgRed"
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`,
                  })
                }
              >
                Déconnexion
              </li>
            </ul>
          </div>
        )}
      </div>
      {showMenu && (
        <p
          className="p-4 lg:hidden hover:underline text-ptgRed"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          Déconnexion
        </p>
      )}
    </div>
  );
};

export default ProfilPic;
