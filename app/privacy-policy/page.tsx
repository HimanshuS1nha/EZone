import Policy from "../components/Policy"

const PrivacyPolicy = () => {
    const policy = [
        {
            title: "Collection of Personal Information",
            content: ["Types of Information: We may collect personal information from customers, such as their name, email address, shipping address, billing address, phone number, and payment details. This information is collected when customers place an order, register an account, subscribe to our newsletter, or interact with our website.", "Voluntary Submission: Customers provide personal information voluntarily, and by doing so, consent to its collection and use for the purposes outlined in this policy.", "Cookies and Tracking Technologies: We may use cookies, web beacons, and similar technologies to collect information about customers' browsing behavior on our website, such as pages visited, products viewed, and referring websites. This helps us personalize the user experience, analyze trends, and improve our website' functionality."]
        },
        {
            title: "Use of Personal Information",
            content: ["Order Processing: We use customers' personal information to process and fulfill their orders, including order confirmation, shipment tracking, and customer support.", "Communication: We may use customers' contact information to communicate with them regarding their orders, provide customer support, respond to inquiries, and send transactional or promotional emails. Customers have the option to unsubscribe from promotional communications.", "Personalization and Improvements: Personal information may be used to personalize customers&apos; shopping experience, recommend products, and improve our website&apos;s functionality and content.", "Legal Compliance: We may use personal information to comply with applicable laws, regulations, or legal processes, and to protect our rights, privacy, safety, or property, as well as that of our customers."]
        },
        {
            title: "Information Sharing and Disclosure",
            content: ["Third-Party Service Providers: We may share customers&apos; personal information with trusted third-party service providers who assist us in operating our business, such as payment processors, shipping companies, and marketing agencies. These service providers are obligated to protect the confidentiality of personal information and are prohibited from using it for any other purposes.", "Legal Requirements: We may disclose personal information if required to do so by law or in response to a valid legal request, such as a court order or government investigation.", "Business Transfers: In the event of a merger, acquisition, or sale of our business assets, personal information may be transferred or disclosed as part of the transaction. Customers will be notified of any such event and their personal information will remain subject to this Privacy Policy."]
        },
        {
            title: "Data Security",
            content: ["We implement industry-standard security measures to protect customers&apos; personal information from unauthorized access, loss, misuse, or alteration. However, no data transmission over the internet or electronic storage method can guarantee absolute security."]
        },
        {
            title: "Data Retention",
            content: ["We retain customers' personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law."]
        },
        {
            title: "Children's Privacy",
            content: ["Our website and services are not intended for children under the age of 13. We do not knowingly collect or store personal information from individuals under the age of 13. If we become aware of any such information being collected, we will take immediate steps to delete it."]
        },
        {
            title: "Updates to the Privacy Policy",
            content: ["We may update or modify this Privacy Policy from time to time to reflect changes in our business practices or legal requirements. Any updates will be posted on our website, and customers are encouraged to review this Privacy Policy periodically."]
        },
    ]
    return (
        <Policy policy={policy} title={"Privacy Policy"} description={"This Privacy Policy outlines how your ecommerce store collects, uses, and protects the personal information of your customers. It is important to have a comprehensive privacy policy to build trust with your customers and demonstrate your commitment to safeguarding their privacy. You can customize the policy to fit your specific business practices and legal requirements. Please note that this is a general template and should be reviewed and modified by a legal professional to ensure compliance with applicable laws and regulations."} />
    )
}

export default PrivacyPolicy
