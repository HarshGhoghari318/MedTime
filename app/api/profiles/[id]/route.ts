import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaProvider";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const profile = await prisma.profile.delete({
      where: { id: params?.id },
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
}