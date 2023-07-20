import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";
import TokenUserCard from "../../../components/shared/TokenUserCard";
import EmptyTrans from "../../../components/shared/Empty States/EmptyTrans";
import empty_card from "../../../public/empty_card.svg"

type BankAccount = {
    accountNumber: number;
    bankCode: number;
    bankName: string;
    accountName: string;
}


export default function AddBank() {
    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => { 
        e.preventDefault()

        const form = e.currentTarget.elements as any

        const body = {
            bankName: form.item(0).value,
            accountNumber: form.item(1).value,
            accountName: form.item(2).value,
            BVN: form.item(3).value,
        }

        console.log(body)

    }

    return (
        <StuLayout>
            <form onSubmit={HandleSubmit}>
                <Header
                    title="Add Withdrawal Bank"
                    desc="Enter your withdrawal bank details"
                />

                <TextInput
                    placeholder="Bank Name"
                    name="Bank Name"
                    type="text"
                />

                <TextInput
                    placeholder="Account Number"
                    name="Account Number"
                    type="number"
                />

                <TextInput
                    placeholder="Account Name"
                    name="Account Name"
                    type="text"
                />

                <TextInput
                    placeholder="BVN"
                    name="BVN"
                    type="number"
                />


                <div className="flex justify-center">
                    <button className="w-full btn-primary btn mt-8 max-w-sm">
                        Submit
                    </button>
                </div>
                        
            </form>
        </StuLayout>
    )

}