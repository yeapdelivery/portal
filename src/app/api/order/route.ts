import { NextResponse } from "next/server";
import db from "../../../../db.json";
import { delay } from "@/utils";

export async function GET() {
  try {
    await delay(2000);
    return NextResponse.json({
      orders: db.orders,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
