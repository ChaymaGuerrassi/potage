"use client";

import Heading from "@/app/components/Heading";
import Button from "@/app/components/buttons/Button";
import ProfilPic from "./ProfilPic";
import Input from "./inputs/Input";
import ImageUpload from "./inputs/ImageUpload";

import { PiPencilSimpleDuotone, PiCheckFatDuotone } from "react-icons/pi";

import { use, useState } from "react";
import { User } from "@prisma/client";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProfilInfosProps {
  user: User;
  currentUser: User | undefined;
}

const ProfilInfos: React.FC<ProfilInfosProps> = ({ user, currentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      userType: user.userType,
      image: user.image,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    setIsLoading(true);
    axios
      .put(`/api/user/${user.id}`, data)
      .then((res) => {
        setIsLoading(false);
        toast.success("Votre profil a été mis à jour avec succès !");
        router.refresh();
        setEditMode(!editMode);
        reset();
      })
      .catch((err) => {
        toast.error(
          "Une erreur est survenue lors de la modification du profil"
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const image = watch("image");

  return (
    <main className="p-9 md:py-12 md:px-24 h-screen">
      <div className="flex justify-between">
        <Heading
          title="Mes informations"
          subtitle="Retrouver vos informations personnelles"
        />
        {currentUser && currentUser.id === user.id && !editMode && (
          <Button
            value="Modifier mon profil"
            onClick={() => {
              setEditMode(!editMode);
            }}
            color="Orange"
            icon={PiPencilSimpleDuotone}
          />
        )}
        {editMode && (
          <Button
            value="Enregistrer les modifications"
            onClick={handleSubmit(onSubmit)}
            color="Green"
            icon={PiCheckFatDuotone}
          />
        )}
      </div>

      {!editMode ? (
        <>
          <div className="mt-8 flex gap-6 items-center">
            <ProfilPic currentUser={user} large />
            <div className="flex flex-col gap-3">
              <p className="font-bold text-2xl">{user.name}</p>
              <p>
                {user.userType === "SELLER"
                  ? "Profil Vendeur"
                  : user.userType === "BUYER"
                  ? "Profil Acheteur"
                  : "Profil Acheteur & Vendeur"}
              </p>
            </div>
          </div>
          <hr className="my-6" />
          <div className="">
            <p className="text-xl font-semibold">Contact</p>
            <p className="text-lg">
              <a href="mailto:user.email">{user.email}</a>
            </p>
          </div>
          <hr className="my-6" />
          <div>
            <p className="text-xl font-semibold">Créé le :</p>
            <p className="text-lg">
              {user.createdAt.toISOString().split("T")[0]}
            </p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
          <div className="flex w-full gap-8">
            <ImageUpload
              value={image}
              onChange={(value) => setCustomValue("image", value)}
            />
            <div className="flex flex-col gap-6 w-full">
              <Input
                id="name"
                label="Nom"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <div className="flex items-center flex-wrap gap-5 mt-4">
                <div className="font-semibold text-xl ">Vous êtes ?</div>

                <Input
                  id="userType"
                  label="Jardinier"
                  type="radio"
                  value={user.userType}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="userType"
                  label="Acheteur"
                  type="radio"
                  value={user.userType}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="userType"
                  label="Les deux"
                  type="radio"
                  value={user.userType}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </main>
  );
};

export default ProfilInfos;
