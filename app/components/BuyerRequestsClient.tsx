"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User, BuyerRequest, RequestStatus} from "@prisma/client";

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

  const onUpdateStatus = useCallback((id: string, status: RequestStatus) => {
    setIsLoading(true);

    axios
      .put(`/api/buyerRequest/${id}`, {
        status,
      })
      .then(() => {
        toast.success("Demande d'achat mise à jour avec succès");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);
  

  const title = sellerSide ? "Mes demandes d'achat reçues" : "Mes demandes d'achat envoyées";
  const subtitle = sellerSide ? "Retrouver les demandes d'achats de vos annonces" : "Retrouver les demandes d'achats que vous avez envoyées";

  return (
    <main className="p-9 md:py-12 md:px-24 h-screen">
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
        {buyerRequests.map((request: any) => (
          <AnnounceCard
            key={request.id}
            actionLabel={sellerSide ? "Accepter" : "Supprimer"}
            //@ts-ignore
            onAction={sellerSide? onUpdateStatus : onDelete}
            disabled={isLoading || deletingId === request.id }
            actionId={request.id}
            sellerSide={sellerSide}
            sellerSideStatus={request.status}
            secondaryActionLabel={"Refuser"}
            //@ts-ignore
            onSecondaryAction={sellerSide ? onUpdateStatus : () => {}}
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
