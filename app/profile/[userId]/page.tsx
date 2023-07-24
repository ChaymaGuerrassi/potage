import EmptyState from "@/app/components/EmptyState";
import ProfilInfos from "@/app/components/ProfilInfos";

import getCurrentUser from "../../actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";

interface UserParams {
  userId: string;
}

export default async function Home({ params }: { params: UserParams }) {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params.userId);

  if (!user) {
    return (
      <EmptyState
        title="Vous n'êtes pas connecté !"
        subtitle="Connectez-vous pour voir votre profil"
      />
    );
  }

  return (
    //@ts-ignore
    <ProfilInfos user={user} currentUser={currentUser}/>
  );
}
