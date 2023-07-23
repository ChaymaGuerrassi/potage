import Image from "next/image";
import EmptyState from "@/app/components/EmptyState";
import getAnnounces from "../actions/getAnnounces";
import getCurrentUser from "../actions/getCurrentUser";
import AnnounceCard from "../components/announce/AnnounceCard";
import { useCallback } from "react";

export default async function Home() {
  const announces = await getAnnounces();
  const currentUser = getCurrentUser();

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
    <main className="p-9 md:py-12 md:px-24">
      <h1 className="text-3xl font-bold">Gérer mes annonces</h1>

      <div
        className="
        mt-8
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-8
        "
      >
        {announces.map((announce) => (
          <AnnounceCard
            key={announce.id}
            //@ts-ignore
            currentUser={currentUser}
            data={announce}
          />
        ))}
      </div>
    </main>
  );
}
