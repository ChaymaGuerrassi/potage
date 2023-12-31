import EmptyState from "@/app/components/EmptyState";
import getAnnounces from "../actions/getAnnounces";
import getCurrentUser from "../actions/getCurrentUser";

import AnnouncesClient from "../components/announce/AnnouncesClient";

export default async function Home() {
  const announces = await getAnnounces();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Vous n'êtes pas connecté !"
        subtitle="Connectez-vous pour voir les annonces"
        showReset
      />
    );
  }

  const isEmpty = announces.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="Il n'y a pas encore d'annonces disponible! "
        subtitle="Revenez bientôt pour voir les annonces des jardiniers locaux"
      />
    );
  }

  return <AnnouncesClient announces={announces} currentUser={currentUser} announceType="offer"/>;
}
