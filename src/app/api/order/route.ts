import { delay } from "@/utils/delay";
import { NextResponse } from "next/server";
import db from "../../../../db.json";

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
