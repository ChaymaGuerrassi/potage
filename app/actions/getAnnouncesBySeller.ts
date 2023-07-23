import prisma from "@/app/libs/prismadb";

interface AnnounceParams {
  sellerId: string;
}

export default async function getAnnouncesBySeller({
  sellerId,
}: AnnounceParams) {
  try {
    const announces = await prisma.announce.findMany({
      where: {
        sellerId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        seller: true,
      },
    });

    return announces;
  } catch (error: any) {
    throw new Error(error);
  }
}
