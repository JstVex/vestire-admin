import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return new NextResponse('Missing billboardId', { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[[STOREID]/BILLBOARDS/[BILLBOARDID]/ROUTE/GET] ERROR:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!label) {
            return new NextResponse('Missing label', { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse('Missing imageUrl', { status: 400 });
        }

        if (!params.billboardId) {
            return new NextResponse('Missing billboardId', { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[[STOREID]/BILLBOARDS/[BILLBOARDID]/ROUTE/PATCH] ERROR:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!params.billboardId) {
            return new NextResponse('Missing billboardId', { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[[STOREID]/BILLBOARDS/[BILLBOARDID]/ROUTE/DELETE] ERROR:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}