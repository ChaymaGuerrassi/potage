import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  announceId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { announceId } = params;

  if (!announceId || typeof announceId !== 'string') {
    throw new Error('Invalid ID');
  }

  const announce = await prisma.announce.deleteMany({
    where: {
      id: announceId,
      sellerId: currentUser.id
    }
  });

  return NextResponse.json(announce);
}