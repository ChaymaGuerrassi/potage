"use client";

import { Announce, BuyerRequest, User, FarmItemType } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Image from "next/image";
import Button from "../buttons/Button";
import { categories } from "@/app/components/modals/AnnounceModal";
import {
  PiMapPinDuotone,
  PiBasketDuotone,
  PiTrashSimpleDuotone,
  PiMessengerLogoDuotone,
  PiPencilSimpleDuotone,
  PiCheckFatDuotone,
} from "react-icons/pi";

interface AnnounceCardProps {
  data: Announce;
  buyerRequest?: BuyerRequest;
  onAction?: (id: string) => void;
  onSecondaryAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  announceType: string;
  actionId?: string;
  sellerSide?: boolean;
  currentUser?: User;
}

const AnnounceCard: React.FC<AnnounceCardProps> = ({
  data,
  buyerRequest,
  announceType,
  onAction,
  onSecondaryAction,
  disabled,
  actionLabel,
  sellerSide,
  secondaryActionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction && onAction(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleSecondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onSecondaryAction && onSecondaryAction(actionId);
    },
    [onSecondaryAction, actionId, disabled]
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
      <div className="flex flex-col justify-between w-full text-ptgGrey border-2 border-ptgGrey rounded-xl bg-ptgBeige h-[550px] max-h-[550px]">
        <div
          className="
            aspect-square 
            w-full 
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
        <div className="px-3">
          <div className="font-semibold text-lg">{data.title}</div>
          <div className="text-base mt-2 h-[35%] max-h-[35%] text-ellipsis max-w-full overflow-hidden">
            {data.description}
          </div>
          <div className="text-lg mt-2 flex gap-1 items-center">
            <PiMapPinDuotone size={18} className="text-ptgBlue" />
            <div className="italic">{data.locationValue}</div>
          </div>

          <div className="flex flex-row items-center gap-1 mt-4">
            <div className="font-bold">{data.price} €</div>
          </div>
        </div>

        <div className="flex gap-2 p-3 pt-0">
          {onSecondaryAction && secondaryActionLabel && (
            <Button
              disabled={disabled}
              value=""
              color=""
              icon={
                announceType === "offer"
                  ? PiMessengerLogoDuotone
                  : sellerSide ? PiCheckFatDuotone : PiPencilSimpleDuotone
              }
              onClick={handleSecondaryAction}
            />
          )}
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              value={actionLabel}
              color={announceType === "offer" ? "Blue" : "Red"}
              full
              icon={
                announceType === "offer"
                  ? PiBasketDuotone
                  : PiTrashSimpleDuotone
              }
              onClick={handleAction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnounceCard;
