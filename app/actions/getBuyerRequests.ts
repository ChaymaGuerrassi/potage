import prisma from "@/app/libs/prismadb";

interface IParams {
    announceId?: string;
    buyerId?: string;
    sellerId?: string;
}

export default async function getBuyerRequests({ announceId, buyerId, sellerId }: IParams) {
    const query: any = {};

    if (announceId) {
        query.sellerItemId = announceId;
    }

    if (buyerId) {
        query.buyerId = buyerId;
    }

    if (sellerId) {
        query.sellerId = sellerId;
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