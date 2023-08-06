import connectToDB from "@/database/db";
import Order from "@/models/Order";
import stripe from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    let success = false;
    let message = '';
    let order;
    try {
        await connectToDB();
        const data = await req.json();
        const { id, oid } = data;
        const session = await stripe.checkout.sessions.retrieve(id);
        if (session.payment_status === 'paid') {
            order = await Order.findByIdAndUpdate(oid, { paymentStatus: 'Paid', paymentInfo: session })
            message = "Your Payment is successful! You Order will be delivered soon."
        }
        else {
            message = "Your Payment is currently pending! You Order will be delivered soon."
        }
        success = true;
        return NextResponse.json({ success, message, id: order.oid });
    } catch (error) {
        return NextResponse.json({ success })
    }

}