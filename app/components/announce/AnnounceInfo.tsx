"use client";

import Image from "next/image";
import Heading from "../Heading";
import { Announce, User, FarmItemType, BuyerRequest } from "@prisma/client";
import { categories } from "@/app/components/modals/AnnounceModal";
import ProfilPic from "../ProfilPic";
import {
  PiMapPinDuotone,
  PiBasketDuotone,
  PiMessengerLogoDuotone,
  PiCheckCircleDuotone,
  PiTrashSimpleDuotone,
} from "react-icons/pi";
import Button from "../buttons/Button";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  category: FarmItemType;
  description: string;
  imageSrc: string;
  id: string;
  seller: User;
  createdAt: Date;
  price: number;
  itemWeight: number;
  itemUnit: number;
  buyerRequests?: BuyerRequest[];
  onAction: (id: string) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser: User;
}

const AnnounceInfo: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  description,
  imageSrc,
  category,
  price,
  onAction,
  createdAt,
  disabled,
  buyerRequests,
  itemWeight,
  currentUser,
  itemUnit,
  id,
  seller,
}) => {
  const getCategoryLabelByValue = (value: FarmItemType) => {
    const category = categories.find((cat) => cat.value === value);
    return category ? category.label : "Unknown Category";
  };

  const hasBuyerRequest = () => {
    if (!buyerRequests) return false;

    const currentItemRequest = buyerRequests.find(
      (request) => request.id === id
    );

    return currentItemRequest;
  };

  const getBuyerRequestStatus = () => {
    if (!buyerRequests) return "none";

    if (hasBuyerRequest()) {
      const currentUserRequest = buyerRequests.find(
        (request) => request.buyerId === currentUser.id
      );
      if (!currentUserRequest) return "none";

      return currentUserRequest;
    }
  };

  console.log(createdAt);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8 ">
      <div
        className="
          h-[60vh]
          overflow-hidden 
          w-full
          md:w-[70%]
          lg:w-1/2
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
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
            text-2xl
            bg-ptgBlue
            leading-none
            rounded-lg
          "
        >
          {getCategoryLabelByValue(category)}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex justify-between md:block ">
            <div className="order-2 md:order-1">
              <Heading title={price.toString() + " €"} subtitle="" />
              <hr className="my-4" />
            </div>

            <div className="order-1 md:order-2">
              <Heading title={title} subtitle={description} />
              <hr className="my-3 md:my-4" />
            </div>
          </div>

          <div className="">
            <p className="font-bold text-xl">
              {itemUnit} x {itemWeight + "kg"}
            </p>
            <hr className="my-3 md:my-0" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            {seller && seller !== null && (
              <ProfilPic //@ts-ignore
                name={seller.name}
              />
            )}
            <div className="flex flex-col gap-1">
              <p>
                Mis en vente par{" "}
                <span className="font-semibold">{seller.name}</span>
              </p>
              <p className="font-light text-gray-500">
                Le {createdAt.getDate() + "/" + createdAt.getMonth() + "/" + createdAt.getFullYear()}
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <PiMapPinDuotone size={18} className="text-ptgBlue" />
                <p>
                  Produit situé à{" "}
                  <span className="italic">{locationValue}</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-8" />

          {currentUser.id !== seller.id && (
            <div className="flex flex-col gap-4">
              <Button
                // @ts-ignore
                onClick={onAction}
                disabled={disabled || getBuyerRequestStatus() !== "none"}
                value={
                  getBuyerRequestStatus() !== "none"
                    ? "Vous avez déjà envoyé une demande"
                    : "Envoyer une demande d'achat"
                }
                color={getBuyerRequestStatus() !== "none" ? "Green" : "Blue"}
                icon={
                  getBuyerRequestStatus() !== "none"
                    ? PiCheckCircleDuotone
                    : PiBasketDuotone
                }
              />
              <Button
                onClick={() => {}}
                disabled={true}
                color="ptg"
                value="Envoyer un message au vendeur"
                icon={PiMessengerLogoDuotone}
              />
            </div>
          )}
          {currentUser.id === seller.id && (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {}}
                disabled={disabled}
                color="Red"
                value="Supprimer l'annonce"
                icon={PiTrashSimpleDuotone}
              />
            </div>
          )}
        </div>
        {/* @ts-ignore */}
      </div>
    </div>
  );
};

export default AnnounceInfo;
