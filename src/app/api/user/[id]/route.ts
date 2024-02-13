import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../_lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    console.log("get params ")
    const id = params.id;

    if (!id) {
        return NextResponse.error();
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id, 10), // Parse as a decimal number
        },
    });

    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    if (!id) {
        return NextResponse.error();
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id, 10), // Parse as a decimal number
        },
    });

    const { name } = await request.json();
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id, 10), // Parse as a decimal number
        },
        data: {
            name: name,
        },
    });

    return NextResponse.json({ success: 1, user: updatedUser, message: "Update success" });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    if (!id) {
        return NextResponse.error();
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id, 10), // Parse as a decimal number
        },
    });

    return NextResponse.json({ success: 1, message: "Delete success" });
}
