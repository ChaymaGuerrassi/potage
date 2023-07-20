"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        registerModal.onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("L'inscription a échoué. Veuillez réessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bienvenue sur ça potage" subtitle="Créer un compte" />
      <Input
        id="email"
        label="E-mail"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nom"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mot de passe"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="font-semibold text-xl mt-6 ">Vous êtes ?</div>

      <div className="flex items-center flex-wrap gap-5 mt-4">
        <Input
          id="userType"
          label="Jardinier"
          type="radio"
          value="SELLER"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="userType"
          label="Acheteur"
          type="radio"
          value="BUYER"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="userType"
          label="Les deux"
          type="radio"
          value="BUYER"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
        text-center
        mt-4
        font-light
        opacity-70
      "
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Déjà inscrit ?</div>
          <div
            className="cursor-pointer hover:underline font-semibold"
            onClick={handleLogin}
          >
            Se connecter
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Inscription"
      actionLabel="S'inscrire"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
