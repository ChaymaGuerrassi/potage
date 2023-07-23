import prisma from "@/app/libs/prismadb";

interface AnnounceParams {
  announceId: string;
}

export default async function getAnnounceById(
  params: AnnounceParams
) {
  try {
    const { announceId } = params;
    const announce = await prisma.announce.findUnique({
      where: { id: announceId },
      include: {
        seller: true,
      },
    });

    if (!announce) {
      return null;
    }

    return announce;
    
  } catch (error: any) {
    throw new Error(error);
  }
}
