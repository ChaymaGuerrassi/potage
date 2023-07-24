import prisma from "@/app/libs/prismadb";

interface IParams {
  announceId?: string;
  buyerId?: string;
}

export default async function getBuyerRequests({
  announceId,
  buyerId,
}: IParams) {
  const query: any = {};

  if (announceId) {
    query.sellerItemId = announceId;
  }

  if (buyerId) {
    query.buyerId = buyerId;
  }

  const buyerRequests = await prisma.buyerRequest.findMany({
    where: query,
    include: {
      sellerItem: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return buyerRequests;
}
