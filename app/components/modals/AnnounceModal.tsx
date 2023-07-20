"use client";

import { useMemo, useState } from "react";

import useAnnounceModal from "@/app/hooks/useAnnounceModal";
import Modal from "./Modal";
import Heading from "../Heading";

import { GiStrawberry } from "react-icons/gi";
import { PiPepperDuotone, PiPlantDuotone, PiFlowerTulipDuotone, PiFlowerDuotone, PiOrangeSliceDuotone, PiEggDuotone, PiBasketDuotone} from "react-icons/pi";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const categories = [
    {label: "Légumes frais", icon: PiPepperDuotone },
    {label: "Fruits", icon: PiOrangeSliceDuotone},
    {label: "Fleurs", icon: PiFlowerTulipDuotone},
    {label: "Herbes aromatiques", icon: PiPlantDuotone},
    {label: "Miel", icon: PiFlowerDuotone},
    {label: "Oeufs", icon: PiEggDuotone},
    {label: "Autre", icon: PiBasketDuotone},
]

const AnnounceModal = () => {
  const announceModal = useAnnounceModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const handleNextStep = () => {
    setStep((value) => value + 1);
  };

  const handlePreviousStep = () => {
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Créer l'annonce";
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
        gris-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-aut
      "
      ></div>
    </div>
  );

  return (
    <Modal
      title="Publier votre annonce"
      isOpen={announceModal.isOpen}
      onClose={announceModal.onClose}
      onSubmit={announceModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handlePreviousStep}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default AnnounceModal;
