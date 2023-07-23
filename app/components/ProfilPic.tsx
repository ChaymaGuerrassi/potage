import { useState } from "react";
import { signOut } from "next-auth/react";

interface ProfilPicProps {
  name: string;
  showMenu?: boolean;
}

const ProfilPic: React.FC<ProfilPicProps> = ({ name, showMenu }) => {
  const [profilMenu, setProfilMenu] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center lg:block">
      <div
        className="rounded-full border-2 w-[52px] h-[52px] border-ptgGrey leading-none bg-slate-300 flex items-center justify-center relative cursor-pointer"
        onClick={() => setProfilMenu(!profilMenu)}
      >
        <p className="font-bold">
          {name.split(" ")[0][0]}{name.split(" ")[1] && name.split(" ")[1][0]}
        </p>

        {showMenu && profilMenu && (
          <div className="absolute top-2 right-2 mt-12 w-[200px] bg-ptgBeige rounded-md shadow-lg hidden lg:block border-2 border-ptgGrey">
            <ul className="flex flex-col">
              <li className="p-4  hover:underline" >Profile</li>
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
