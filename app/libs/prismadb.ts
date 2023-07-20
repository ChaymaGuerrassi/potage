import { PrismaClient } from '@prisma/client';

//Next13 best practice => not create prisma client on every request
//https://nextjs.org/docs/basic-features/typescript#type-declarations

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;  