import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  buyerRequestId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { buyerRequestId } = params;

  if (!buyerRequestId || typeof buyerRequestId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.buyerRequest.deleteMany({
    where: {
      id: buyerRequestId,
      OR: [
        { buyerId: currentUser.id },
        { sellerItem: { sellerId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}