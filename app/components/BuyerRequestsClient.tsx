"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User, BuyerRequest } from "@prisma/client";

import Heading from "./Heading";
import AnnounceCard from "./announce/AnnounceCard";

interface BuyerRequestClientProps {
  buyerRequests: BuyerRequest[];
  currentUser?: User | null;
  sellerSide?: boolean;
}

const BuyerRequestClient: React.FC<BuyerRequestClientProps> = ({
  buyerRequests,
  currentUser,
  sellerSide,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(buyerRequests);

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/buyerRequest/${id}`)
        .then(() => {
          toast.success("Demande d'achat supprimée avec succès");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <main className="p-9 md:py-12 md:px-24">
      <Heading title="Mes demandes d'achat" subtitle="Mes demandes d'achat" />
      <div
        className="
          mt-8
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-4
        gap-8
        "
      >
        {buyerRequests.map((request: any) => (
          <AnnounceCard
            key={request.id}
            actionLabel={sellerSide ? "Voir" : "Supprimer"}
            onAction={onDelete}
            announceType={"seller"}
            disabled={isLoading || deletingId === request.id || sellerSide}
            actionId={request.id}
            sellerSide={sellerSide}
            secondaryActionLabel={""}
            onSecondaryAction={() => {}}
            //@ts-ignore
            currentUser={currentUser}
            data={request.sellerItem}
          />
        ))}
      </div>
    </main>
  );
};

export default BuyerRequestClient;
