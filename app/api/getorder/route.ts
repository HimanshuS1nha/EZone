import connectToDB from "@/database/db";
import Order from "@/models/Order"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const id = await req.json();
        const order = await Order.find({ oid: id })
        success = true;
        return NextResponse.json({ success, order })
    } catch (error) {
        return NextResponse.json({ success })
    }
}