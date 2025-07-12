import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaProvider";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password, name, image } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Email, name, and password are required" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      image,
    },
  });

  return NextResponse.json({
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      image: newUser.image,
    },
    status: 201,
  });
}
