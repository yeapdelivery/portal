import axios from "axios";
import { delay } from "@/utils/delay";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await delay(2000);
    const { data: orders } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/orders`
    );

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
