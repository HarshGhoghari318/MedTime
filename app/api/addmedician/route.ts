import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prismaProvider";

export async function POST(req: NextRequest) {
    const {name,dieases,dose,profileId}= await req.json()
    
    const medician = await prisma.medician.create({
        data:{
            name,
            dieases,
            dose,
            profileId
        }
        
    })
    return NextResponse.json(medician, { status: 201 });

}