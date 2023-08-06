import React from 'react'

const RefundPolicy = () => {
    return (
        <div className="max-w-xl md:max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
            <p className="mb-4">
                Thank you for shopping at EZONE. We value your satisfaction and want to ensure you have a positive shopping experience. If you are not entirely satisfied with your purchase, we&apos;re here to help.
            </p>

            <h3 className="text-xl font-bold mb-2">1. Eligibility for Refunds</h3>
            <p className="mb-2">
                To be eligible for a refund, please make sure that:
            </p>
            <ul className="list-decimal ml-5 mb-4">
                <li>The item was purchased directly from EZONE.</li>
                <li>The item is unused, in its original condition, and in the original packaging.</li>
                <li>You have a valid proof of purchase, such as an order confirmation or receipt.</li>
                <li>The return request is made within 30 days of receiving the product.</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">2. Refund Process</h3>
            <p className="mb-2">
                To initiate a refund, please follow these steps:
            </p>
            <ol className="list-decimal ml-5 mb-4">
                <li>Contact our customer support team at contact@ezone.com/9876543210 to inform them about your refund request.</li>
                <li>Provide the necessary details, including your order number, the item(s) you wish to return, and the reason for the return.</li>
                <li>Wait for our customer support team to review your request and provide further instructions.</li>
                <li>Once your return is approved, you will be provided with a return shipping address (if applicable) and any additional instructions.</li>
                <li>Ship the item(s) back to us using a trackable shipping method. Please ensure that the item is securely packaged to prevent any damage during transit.</li>
                <li>Provide our customer support team with the return tracking number.</li>
                <li>Once we receive the returned item(s), our team will inspect them to ensure they meet the eligibility criteria mentioned above.</li>
                <li>If the return is approved, a refund will be processed to the original payment method within 7 days.</li>
                <li>Please note that any shipping charges incurred during the return process are non-refundable.</li>
            </ol>

            <h3 className="text-xl font-bold mb-2">3. Exceptions</h3>
            <p className="mb-4">
                The following items are not eligible for a refund:
            </p>
            <ul className="list-decimal ml-5 mb-4">
                <li>Customized or personalized items.</li>
                <li>Gift cards or promotional vouchers.</li>
                <li>Items that are damaged or missing parts due to customer negligence.</li>
                <li>Items that are not in their original condition or packaging.</li>
            </ul>

            <p className="mb-4">
                If you have any questions about our refund policy, please contact our customer support team at contact@ezone.com/9876543210. We are here to assist you and address any concerns you may have.
            </p>
        </div>
    )
}

export default RefundPolicy