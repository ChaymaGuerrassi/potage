"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Announce, User } from "@prisma/client";
import useLoginModal from "@/app/hooks/useLoginModal";

import Heading from "../Heading";
import AnnounceCard from "./AnnounceCard";

interface AnnouncesClientProps {
  announces: Announce[];
  currentUser?: User | null;
  announceType: string;
  title?: string;
  subtitle?: string;
}

const AnnouncesClient: React.FC<AnnouncesClientProps> = ({
  announces,
  currentUser,
  announceType,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [requestItemId, setRequestItemId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  const title = announceType === "offer" ? "Annonces de jardinier" : "Mes annonces de jardinage durable";
  const subtitle = announceType === "offer" ? "Explorer les annonces de produits bio issus d'un jardinage durable" : "Gérer vos annonces";

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
      <Heading title={title} subtitle={subtitle} />
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
        {announces.map((announce: Announce) => (
          <AnnounceCard
            key={announce.id}
            actionLabel={
              announceType === "offer" ? "Envoyer une demande" : "Supprimer"
            }
            onAction={announceType === "offer" ? onSendBuyerRequest : onDelete}
            secondaryActionLabel="Modifier l'annonce"
            onSecondaryAction={() => console.log("edit")}
            announceType={announceType}
            disabled={
              isLoading ||
              deletingId === announce.id ||
              requestItemId === announce.id
            }
            actionId={announce.id}
            //@ts-ignore
            currentUser={currentUser}
            data={announce}
          />
        ))}
      </div>
    </main>
  );
};

export default AnnouncesClient;
