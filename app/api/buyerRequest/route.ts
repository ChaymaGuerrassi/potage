import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { sellerItemId, buyerId } = body;

  if (!sellerItemId || !buyerId) {
    return NextResponse.error();
  }

  const buyerRequestItem = await prisma.announce.update({
    where: {
      id: sellerItemId,
    },
    data: {
      buyerRequests: {
        create: {
          buyerId,
        },
      },
    },
  });


  return NextResponse.json(buyerRequestItem);
}
