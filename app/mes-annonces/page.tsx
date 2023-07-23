import EmptyState from "@/app/components/EmptyState";
import getAnnouncesBySeller from "../actions/getAnnouncesBySeller";
import getCurrentUser from "../actions/getCurrentUser";

import AnnouncesClient from "../components/announce/AnnouncesClient";

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

  const announces = await getAnnouncesBySeller({ sellerId: currentUser.id });

  const isEmpty = announces.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="Vous n'avez pas encore d'annonce ! "
        subtitle="Mettez en ligne le fruit de votre jardinage"
        showReset
      />
    );
  }

  return (
    <AnnouncesClient announces={announces} currentUser={currentUser} announceType="seller"/>
  );
}
