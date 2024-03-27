import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// read
export const GET = async (req: NextRequest) => {
  const customers = await prisma.customer.findMany({});

  return NextResponse.json(customers);
};

// create
export const POST = async (req: NextRequest) => {
  const { name, phone, city } = await req.json();

  const customer = await prisma.customer.create({
    data: {
      name,
      phone,
      city,
    },
  });

  return NextResponse.json({
    customer,
  });
};
