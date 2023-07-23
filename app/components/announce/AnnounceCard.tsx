"use client";

import { Announce, BuyerRequest, User, FarmItemType } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Image from "next/image";
import Button from "../buttons/Button";
import { categories } from "@/app/components/modals/AnnounceModal";
import { PiMapPinDuotone } from "react-icons/pi";

interface AnnounceCardProps {
  data: Announce;
  buyerRequest?: BuyerRequest;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User;
}

const AnnounceCard: React.FC<AnnounceCardProps> = ({
  data,
  buyerRequest,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction && onAction(actionId);
    },
    [onAction, actionId, disabled]
  );

  const getCategoryLabelByValue = (value: FarmItemType) => {
    const category = categories.find((cat) => cat.value === value);
    return category ? category.label : "Unknown Category";
  };

  return (
    <div
      onClick={() => router.push(`/annonces/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full text-ptgGrey border-2 border-ptgGrey rounded-xl bg-ptgBeige">
        <div
          className="
            aspect-square 
            w-full 
            max-h-64
            relative 
            overflow-hidden 
            rounded-t-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt={data.description}
          />
          <div
            className="
            absolute
            flex
            items-center
            justify-center
            top-3
            right-3
            px-3
            py-2
            text-ptgBeige
            bg-ptgBlue
            leading-none
            rounded-lg
          "
          >
            {getCategoryLabelByValue(data.category)}
          </div>
        </div>
        <div className="p-3">
          <div className="font-semibold text-lg">{data.title}</div>
          <div className="text-base mt-2 h-[30%] max-h-[30%]">{data.description}</div>
          <div className="text-lg mt-2 flex gap-1">
            <PiMapPinDuotone size={18} className="text-ptgBlue" />
            <div className="italic">{data.locationValue}</div>
          </div>

          <div className="flex flex-row items-center gap-1 mt-4">
            <div className="font-bold">{data.price} €</div>
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              value={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnounceCard;
