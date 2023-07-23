import prisma from "@/app/libs/prismadb";

export default async function getAnnounces() {
  try {
    const announces = await prisma.announce.findMany({
      orderBy: { createdAt: "desc" },
    });

    return announces;
    
  } catch (error: any) {
    throw new Error(error);
  }
}
