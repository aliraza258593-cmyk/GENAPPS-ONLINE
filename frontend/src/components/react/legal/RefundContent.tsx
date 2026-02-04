import React from "react";
import { LegalLayout } from "./LegalLayout";

export const RefundContent = () => {
    return (
        <LegalLayout title="Refund Policy" lastUpdated="October 24, 2023">
            <h3>30-Day Money-Back Guarantee</h3>
            <p>We offer a 30-day money-back guarantee for all new subscriptions.</p>

            <h3>Eligibility</h3>
            <p>To be eligible for a refund, you must submit your request within 30 days of your initial purchase.</p>

            <h3>Processing</h3>
            <p>Once your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.</p>

            <h3>Contact</h3>
            <p>To request a refund, please contact our support team.</p>
        </LegalLayout>
    );
};
