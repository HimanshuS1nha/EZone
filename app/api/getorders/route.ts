import connectToDB from "@/database/db";
import Order from "@/models/Order"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const data = await req.json();
        const orders = await Order.find({ email: data })
        success = true;
        return NextResponse.json({ success, orders })
    } catch (error) {
        return NextResponse.json({ success })
    }
}