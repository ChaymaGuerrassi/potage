"use client";

import { Announce, User, FarmItemType, BuyerRequest } from "@prisma/client";
import AnnounceInfo from "@/app/components/announce/AnnounceInfo";
import { useCallback, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ListingPreviewProps {
  buyerRequests?: BuyerRequest[];
  data: Announce;
  currentUser?: User | null;
  seller: User | null;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({
  data,
  currentUser,
  buyerRequests,
  seller,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();

  const router = useRouter();

  const onSendBuyerRequest = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/buyerRequest", {
        sellerItemId: data.id,
        buyerId: currentUser.id,
      })
      .then(() => {
        toast.success("Votre demande a bien été envoyée");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Une erreur est survenue");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, data.id, loginModal, router]);

  return (
    <div
      className="
          max-w-full
        "
    >
      <div className="flex flex-col gap-6">
        <AnnounceInfo
          title={data.title}
          imageSrc={data.imageSrc}
          category={data.category}
          description={data.description}
          locationValue={data.locationValue}
          price={data.price}
          itemWeight={data.itemWeight}
          disabled={isLoading}
          itemUnit={data.itemUnit}
          onAction={onSendBuyerRequest}
          onDelete={() => {}}
          //   @ts-ignore
          currentUser={currentUser}
          buyerRequests={buyerRequests}
          id={data.id}
          //   @ts-ignore
          seller={seller}
        />
      </div>
    </div>
  );
};

export default ListingPreview;
