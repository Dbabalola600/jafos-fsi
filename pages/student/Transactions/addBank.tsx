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
import GoodMess from "../../../components/shared/GoodMess";
import BankComponent from "../../../components/shared/FLUTTER/bankComponent";

type BankAccount = {
    accountNumber: number;
    bankCode: number;
    bankName: string;
    accountName: string;
}


type Bank = {
    id: number,
    code: String,
    name: string
}


export default function AddBank() {
    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })
    const [showtoast, settoast] = useState({ message: "", show: false })

    const router = useRouter()
    const token = getCookie("Normuser")

    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])




    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any

        const body = {
            id: token,
            bankName: form.item(0).value,
            accountNo: form.item(1).value,
            accountName: form.item(2).value,
            BVN: form.item(3).value,
        }

        const response = await fetch("/api/student/account/AddBank", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    setgoodtoast({ message: "", show: true })
                    router.push("/student/Transactions/withdrawToBank")
                } else {
                    settoast({ message: " message", show: true })

                }
            })

        console.log(body)

    }







    return (
        <StuLayout>
            <form onSubmit={HandleSubmit}>
                <Header
                    title="Add Withdrawal Bank"
                    desc="Enter your withdrawal bank details"
                />

                <div
                    className="pt-5  "
                >

                    {/* <div
                        className="form-control w-full max-w-xs mx-auto"
                    >
                        <label>
                            <span className="label-text text-black  text-base">Bank Name</span>
                        </label>
                        <select className="select select-primary mt-3  max-w-xs w-full ">


                            {bank.map((bank: {
                                id: number,
                                code: String,
                                name: string
                            }, index) => (
                                <option
                                    key={index}
                                >
                                    {bank.name}
                                </option>
                            ))}



                        </select>
                    </div> */}

                    <BankComponent />


                </div>

                <TextInput
                    placeholder="Account Number"
                    name="Account Number"
                    type="text"
                />

                <TextInput
                    placeholder="Account Name"
                    name="Account Name"
                    type="text"
                />

                <TextInput
                    placeholder="BVN"
                    name="BVN"
                    type="text"
                />


                <div className="flex justify-center">
                    <button className="w-full btn-primary btn mt-8 max-w-sm">
                        Submit
                    </button>
                </div>

                <div
                    className="mt-10"
                >
                    {showtoast.show && <ErrMess title="Unknown Error" />}

                    {showgoodtoast.show && <GoodMess title="created successfuly" />}

                </div>

            </form>
        </StuLayout>
    )

}