import { useState } from "react";
import { signOut } from "next-auth/react";

interface ProfilPicProps {
  name: string;
}

const ProfilPic: React.FC<ProfilPicProps> = ({ name }) => {
  const [profilMenu, setProfilMenu] = useState(false);


  return (
    <div className="flex flex-col items-center justify-center lg:block">
      <div
        className="rounded-full border-2 w-[52px] h-[52px] border-ptgGrey leading-none bg-slate-300 flex items-center justify-center relative cursor-pointer"
        onClick={() => setProfilMenu(!profilMenu)}
      >
        <p>
          {name.split(" ")[0][0]} {name.split(" ")[1] && name.split(" ")[1][0]}
        </p>

        {profilMenu && (
          <div className="absolute top-2 right-2 mt-12 w-[200px] bg-ptgBeige rounded-md shadow-lg hidden lg:block">
            <ul className="flex flex-col">
              <li className="p-4  hover:underline">Profile</li>
              <li className="p-4  hover:underline text-ptgRed" onClick={() => signOut()}>Déconnexion</li>
            </ul>
          </div>
        )}
      </div>
      <p className="p-4 lg:hidden hover:underline text-ptgRed" onClick={() => signOut()}>Déconnexion</p>

    </div>
  );
};

export default ProfilPic;
