import getAnnounceById from "@/app/actions/getAnnounceById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import getBuyerRequests from "@/app/actions/getBuyerRequests";
import ListingPreview from "./ListingPreview";


interface AnnounceParams {
  announceId: string;
}

export default async function Home({ params }: { params: AnnounceParams }) {
  const announce = await getAnnounceById(params);
  const currentUser = await getCurrentUser();
  const seller = announce && await getUserById(announce.sellerId) || null;
  const buyerRequests = await getBuyerRequests(params);


  if (!announce) {
    return (
      <EmptyState
        title="Cette annonce n'existe pas ! "
        subtitle="Veuillez vérifier l'URL"
      />
    );
  }

  return (
    <main className="p-9 md:py-12 md:px-24">
      {/* @ts-ignore */}
      <ListingPreview
        data={announce}
        currentUser={currentUser}
        seller={seller}
        buyerRequests={buyerRequests}
      />
    </main>
  );
}
