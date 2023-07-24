import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";

interface IParams {
  userId?: string;
  data: Partial<User>;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

  const body = await request.json();

  const { name, email, image, userType } = body;

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!name || !email || !image || !userType) {
    throw new Error("Invalid data");
  }


  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      image,
      userType,
    },
  });

  return NextResponse.json(user);
}
