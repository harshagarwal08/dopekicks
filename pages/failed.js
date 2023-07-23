import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold">Payment failed!</div>
                    <div className="text-lg font-medium text-black/[0.5] mt-2">
                        Your order has not been placed. If any money has been
                        deducted from your bank account, it will be refunded in 3-5 business days.
                    </div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">contact@dopekicks.com</div>

                    <Link href="/" className="font-bold mt-5 hover:text-black/[0.7]">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};

export default Failed;