"use client";

import Button from "./buttons/Button";
import useAnnounceModal from "../hooks/useAnnounceModal";
import Heading from "./Heading";
import { FaPlus } from "react-icons/fa";
import { PiPottedPlantDuotone } from "react-icons/pi";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset = false,
}) => {
  const announceModal = useAnnounceModal();

  return (
    <div
      className="
    h-[60vh]
    flex 
    flex-col 
    gap-12
    justify-center 
    items-center 
  "
    >
      <PiPottedPlantDuotone size={80} className="text-ptgBlue"/>
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48">
        {showReset && (
          <Button
            value="Créer une annonce"
            onClick={announceModal.onOpen}
            icon={FaPlus}
            color="Blue"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
