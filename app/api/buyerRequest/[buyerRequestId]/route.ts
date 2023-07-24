import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { RequestStatus } from "@prisma/client";

interface IParams {
  buyerRequestId?: string;
  status?: RequestStatus;
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

  if (!buyerRequestId || typeof buyerRequestId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.buyerRequest.deleteMany({
    where: {
      id: buyerRequestId,
      OR: [
        { buyerId: currentUser.id },
        { sellerItem: { sellerId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { status } = body;

  const { buyerRequestId } = params;

  if (!status) {
    throw new Error("Invalid STATUS");
  }

  const buyerRequestUpdate = await prisma.buyerRequest.update({
    where: {
      id: buyerRequestId,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(buyerRequestUpdate);
}
