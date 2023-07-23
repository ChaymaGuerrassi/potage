import prisma from "@/app/libs/prismadb";

interface AnnounceParams {
  buyerId: string;
}

export default async function getAnnouncesByBuyer({
    buyerId,
}: AnnounceParams) {
  try {
    const announces = await prisma.buyerRequest.findMany({
      where: {
        buyerId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        buyer: true,
      },
    });

    return announces;
  } catch (error: any) {
    throw new Error(error);
  }
}
