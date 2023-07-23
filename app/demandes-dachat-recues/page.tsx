import EmptyState from "@/app/components/EmptyState";
import getBuyerRequestsBySeller from "../actions/getBuyerRequestsBySeller";
import getCurrentUser from "../actions/getCurrentUser";

import BuyerRequestClient from "../components/BuyerRequestsClient";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Vous n'êtes pas connecté !"
        subtitle="Connectez-vous pour voir vos demandes d'achat reçues"
        showReset
      />
    );
  }

  const announces = await getBuyerRequestsBySeller({ sellerId: currentUser.id });

  const isEmpty = announces.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="Vous n'avez pas encore reçu de demandes d'achat ! "
        subtitle="Gambatte !"
      />
    );
  }

  return (
    <BuyerRequestClient buyerRequests={announces} currentUser={currentUser} sellerSide/>
  );
}
