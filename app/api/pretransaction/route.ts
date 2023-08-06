import { NextRequest, NextResponse } from "next/server";
import { StripeCartProps } from "@/types";
import Order from "@/models/Order";
import connectToDB from "@/database/db";
import stripe from "@/utils/stripe";

export const POST = async (req: NextRequest, res: NextResponse) => {
    let success = false;
    try {
        await connectToDB();
        const data = await req.json();
        const { cart, oid, amount }: StripeCartProps = data;
        const order = await Order.findOne({ oid });
        if (!order) {
            const { name, email, phone, address, city, state, pincode } = data.user;
            const order = await Order.create({ oid, name, email, phone, address, city, state, pincode, products: cart, amount })
            const session = await stripe.checkout.sessions.create({
                line_items: cart.map((ele) => {
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: ele.name
                            },
                            unit_amount: ele.price * 100
                        },
                        quantity: ele.quantity
                    }
                }),
                mode: 'payment',
                payment_method_types: ['card'],
                success_url: `${process.env.NEXTAUTH_URL}/success?id=${order.id}`,
                cancel_url: `${process.env.NEXTAUTH_URL}`
            })
            success = true;
            return NextResponse.json({ success, url: session.url, id: session.id })
        }
        else {
            const session = await stripe.checkout.sessions.create({
                line_items: cart.map((ele) => {
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: ele.name
                            },
                            unit_amount: ele.price * 100
                        },
                        quantity: ele.quantity
                    }
                }),
                mode: 'payment',
                payment_method_types: ['card'],
                success_url: `${process.env.NEXTAUTH_URL}/success?id=${order.id}`,
                cancel_url: `${process.env.NEXTAUTH_URL}`
            })
            success = true;
            return NextResponse.json({ success, url: session.url, id: session.id })
        }
    } catch (error) {
        return NextResponse.json({ success })
    }
}