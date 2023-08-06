import React from 'react'
import Policy from '../components/Policy'

const TermsAndConditions = () => {
    const policy = [
        {
            title: "Intellectual Property",
            content: ["All content on our website, including text, graphics, logos, images, product descriptions, and software, is the property of EZONE and protected by intellectual property laws. You may not reproduce, distribute, modify, or sell any content from our website without our prior written consent."]
        },
        {
            title: "Product Information",
            content: ["We strive to provide accurate and up-to-date information about our products. However, we do not guarantee the completeness, accuracy, or reliability of any product information on our website. The colors, dimensions, and other product details may vary slightly from the actual product due to factors such as screen settings and manufacturing processes."]
        },
        {
            title: "Pricing and Payment",
            content: ["The prices displayed on our website are in rupees and are subject to change without prior notice. We reserve the right to modify or discontinue any product or service without liability. Payments for orders are processed securely through our payment gateway. By making a purchase, you agree to provide accurate and complete payment information. We are not responsible for any unauthorized charges or payment errors resulting from incorrect or outdated payment information provided by you."]
        },
        {
            title: "Shipping and Delivery",
            content: ["We strive to process and ship orders in a timely manner. However, we do not guarantee specific delivery dates or times. The shipping costs and estimated delivery times are provided at the checkout based on the shipping destination and selected shipping method. Any customs duties, taxes, or import fees imposed by the destination country are the responsibility of the customer."]
        },
        {
            title: "Returns and Exchanges",
            content: ["We have a separate Refund Policy that outlines the terms and conditions for returns and exchanges. Please refer to our Refund Policy for more information."]
        },
        {
            title: "User Accounts",
            content: ["To access certain features or services on our website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other security breaches. We reserve the right to suspend or terminate your account if we suspect any fraudulent, abusive, or illegal activities."]
        },
        {
            title: "Limitation of Liability",
            content: ["EZONE, its directors, employees, or affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use our website or services. We do not warrant that our website will be error-free, secure, or uninterrupted."]
        },
        {
            title: "Governing Law",
            content: ["These terms and conditions shall be governed by and construed in accordance with the laws of India.", "If you have any questions about our terms and conditions, please contact us at contact@ezone.com/9876543210. By using our website and services, you agree to abide by these terms and conditions and any future updates or modifications to them."]
        }
    ]
    return (
        <Policy policy={policy} title={"Terms and Conditions"} description={"Welcome to EZONE. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using our website, you agree to comply with these terms and conditions. Please read them carefully."} />
    )
}

export default TermsAndConditions