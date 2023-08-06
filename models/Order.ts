import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    oid: {
        type: Number,
        required: [true, "Order ID is required"],
        unique: [true, "Order ID must be unique"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: Number,
        required: [true, "Phone Number is reuired"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    pincode: {
        type: Number,
        required: [true, "Pincode is required"]
    },
    products: {
        type: Array,
        reuired: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    },
    paymentInfo: {
        type: Object
    }
}, { timestamps: true })

const Order = models.Order || model("Order", OrderSchema)

export default Order;