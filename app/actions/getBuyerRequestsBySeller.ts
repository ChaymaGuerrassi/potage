import prisma from "@/app/libs/prismadb";

interface BuyerRequestsBySellerParams {
  sellerId: string;
}

export default async function getBuyerRequestsBySeller({
  sellerId,
}: BuyerRequestsBySellerParams) {
  try {
    const sellerAnnounces = await prisma.announce.findMany({
      where: {
        sellerId: sellerId,
      },
      include: {
        buyerRequests: {
          include: { buyer: true, sellerItem: true },
        },
      },
    });

    const buyerRequests = sellerAnnounces.flatMap(
      (announce) => announce.buyerRequests
    );

    return buyerRequests;
  } catch (error: any) {
    throw new Error(error);
  }
}
