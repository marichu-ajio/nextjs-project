// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../_lib/prisma';

// GET endpoint
export async function GET() {
    // Fetch users
    const users = await prisma.user.findMany();

    // Return JSON response
    return NextResponse.json(users);
}

// POST endpoint
export async function POST(request: NextRequest) {
    // Parse JSON request body
    const body = await request.json();
    const { name } = body;

    // Create a new user
    const newUser = await prisma.user.create({
        data: {
            name: name,
        },
    });

    // Return success JSON response
    return NextResponse.json({ "success": 1, "message": "create success", "user": newUser });
}
