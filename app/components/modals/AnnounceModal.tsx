"use client";

import { useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import useAnnounceModal from "@/app/hooks/useAnnounceModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryCard from "../CategoryCard";
import LocationSearch from "../inputs/LocationSelect";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";

import {
  PiPepperDuotone,
  PiPlantDuotone,
  PiFlowerTulipDuotone,
  PiFlowerDuotone,
  PiOrangeSliceDuotone,
  PiEggDuotone,
  PiBasketDuotone,
  PiBoneDuotone,
} from "react-icons/pi";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  PRICE = 3,
  IMAGES = 4,
}

export const categories = [
  { label: "Légumes frais", icon: PiPepperDuotone, value: "VEGETABLES" },
  { label: "Fruits", icon: PiOrangeSliceDuotone, value: "FRUITS" },
  { label: "Fleurs", icon: PiFlowerTulipDuotone, value: "FLOWERS" },
  { label: "Herbes aromatiques", icon: PiPlantDuotone, value: "HERBS" },
  { label: "Miel", icon: PiFlowerDuotone, value: "HONEY"},
  { label: "Oeufs", icon: PiEggDuotone, value: "EGGS" },
  { label: "Produits Laitiers", icon: PiBoneDuotone, value: "DAIRY" },
  { label: "Autre", icon: PiBasketDuotone, value: "OTHER" },
];

const AnnounceModal = () => {
  const announceModal = useAnnounceModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
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
      category: "",
      location: null,
      title: "",
      description: "",
      itemWeight: 1,
      itemUnit: 1,
      price: 1,
      imageSrc: [],
    },
  });

  const category = watch("category");
  const location = watch("location");
  const title = watch("title");
  const description = watch("description");
  const itemUnit = watch("itemUnit");
  const itemWeight = watch("itemWeight");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleNextStep = () => {
    setStep((value) => value + 1);
  };

  const handlePreviousStep = () => {
    setStep((value) => value - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      return handleNextStep();
    }
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/announce", data)
      .then((res) => {
        toast.success("Votre annonce a été créée avec succès !");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        announceModal.onClose();
      })
      .catch((err) => {
        toast.error("Une erreur est survenue lors de la création de l'annonce");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) return "Créer l'annonce";
    return "Suivant";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Précédent";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Quelque chose à vendre ?"
        subtitle="Choisissez une catégorie"
      />
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {categories.map((item) => (
          <CategoryCard
            key={item.value}
            label={item.label}
            selected={category === item.value}
            icon={item.icon}
            onClick={(category) => {
              setCustomValue("category", item.value);
            }}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Où se trouve votre produit ?"
          subtitle="Permet aux clients de trouver votre annonce"
        />

        <LocationSearch
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Décrivez votre produit"
          subtitle="Titre, description, poids, quantité"
        />
        <Input
          id="title"
          label="Titre"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Counter
          title="Combien de produits ?"
          subtitle="Le nombre de produits"
          value={itemUnit}
          onChange={(value) => setCustomValue("itemUnit", value)}
        />
        <Counter
          title="Combien pèse un produit ?"
          subtitle="Le nombre de kilos"
          value={itemWeight}
          onChange={(value) => setCustomValue("itemWeight", value)}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Combien coûte votre produit?"
          subtitle="Titre, description, poids, quantité"
        />
        <Input
          id="price"
          label="Prix"
          type="number"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ajoutez des images de votre produit"
          subtitle="Permet aux clients d'avoir un aperçu de votre produit"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Publier votre annonce"
      isOpen={announceModal.isOpen}
      onClose={announceModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handlePreviousStep}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default AnnounceModal;
