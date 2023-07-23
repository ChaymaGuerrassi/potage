"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User, BuyerRequest } from "@prisma/client";
import useLoginModal from "@/app/hooks/useLoginModal";

import Heading from "./Heading";
import AnnounceCard from "./announce/AnnounceCard";

interface BuyerRequestClientProps {
  buyerRequests: BuyerRequest[];
  currentUser?: User | null;
}

const BuyerRequestClient: React.FC<BuyerRequestClientProps> = ({
  buyerRequests,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [requestItemId, setRequestItemId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();


  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/announce/${id}`)
        .then(() => {
          toast.success("Annonce supprimée avec succès");
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

  const onSendBuyerRequest = useCallback(
    (id: string) => {
      if (!currentUser) return loginModal.onOpen();

      setIsLoading(true);
      setRequestItemId(id);

      axios
        .post("/api/buyerRequest", {
          sellerItemId: id,
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
          setRequestItemId("");
        });
    },
    [currentUser, loginModal, router]
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
            actionLabel={
              "Supprimer"
            }
            onAction={onDelete}
            secondaryActionLabel="Modifier l'annonce"
            onSecondaryAction={() => console.log("edit")}
            announceType={"seller"}
            disabled={
              isLoading ||
              deletingId === request.id 
            }
            actionId={request.id}
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
