import EmptyState from "@/app/components/EmptyState";
import { useEffect } from "react";
import getBuyerRequests from "../actions/getBuyerRequests";
import getCurrentUser from "../actions/getCurrentUser";

import BuyerRequestClient from "../components/BuyerRequestsClient";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Vous n'êtes pas connecté !"
        subtitle="Connectez-vous pour voir vos annonces"
        showReset
      />
    );
  }

  const announces = await getBuyerRequests({ buyerId: currentUser.id });

  const isEmpty = announces.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="Vous n'avez pas encore de demandes d'achat ! "
        subtitle="Parcourez les annonces de jardiniers locaux"
        showReset
      />
    );
  }

  return (
    <BuyerRequestClient buyerRequests={announces} currentUser={currentUser} />
  );
}
