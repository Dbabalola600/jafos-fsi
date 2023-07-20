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

type BankDetails = {
    accountNo: string,
    bankName: string,
    accountName: string,
    BVN: string
}


export default function WithdrawToBank() {
    const router = useRouter()

    const [bankAccounts, setBankAccounts] = useState<BankDetails[]>([])
    // const [bankAccounts, setBankAccounts] = useState<BankAccount[] | null>([
    //     {
    //         accountNumber: 2209903548,
    //         bankCode: 3001,
    //         bankName: "Zenith Bank",
    //         accountName: "Olatubosun John"
    //     },
    //     {
    //         accountNumber: 2831072808,
    //         bankCode: 2301,
    //         bankName: "Eco Bank",
    //         accountName: "Olatubosun John"
    //     },
    // ])


    const showinfo = async () => {


        const token = getCookie("Normuser")
        const body = {
            id: token
        }

        const response = await fetch("/api/student/account/getBank", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as BankDetails[]


        setBankAccounts(response)
        console.log(response)
    }

    useEffect(() => {
        showinfo()

    }, [])


    if (bankAccounts === null) {
        return (
            <StuLayout>
                <>
                    <Header
                        title="Withdraw from Wallet"
                    />

                    <h1 className="text-center text-xl text-primary font-medium">Link a Bank account</h1>

                    <div className="shadow-lg rounded-xl flex justify-center mt-2 py-8">
                        <div>
                            <div className="flex justify-center">
                                <Image
                                    src={empty_card}
                                    width={300}
                                    height={300}
                                    className='flex justify-center'
                                />
                            </div>
                            <h1 className="text-center font-bold text-2xl text-black">Bank Account</h1>
                            <p className="text-center font-medium text-2xl text-black">Transfer money from your jafos account to your bank account</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => router.push("/student/Transactions/addBank")}
                            className="bg-black text-white font-bold text-2xl px-7 py-2 rounded-2xl"
                        >
                            Link Bank
                        </button>
                    </div>

                </>
            </StuLayout>
        )
    } else {
        return (
            <StuLayout>
                <>
                    <Header
                        title="Withdraw from Wallet"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        {bankAccounts.map((bankAccount: BankDetails) => (
                            <div className="bg-primary py-4 px-4 col-span-1 rounded-md" key={bankAccount.accountNo}>
                                <p className="text-white">{bankAccount.bankName}</p>
                                <h1 className="text-white font-bold text-2xl">{bankAccount.accountNo}</h1>
                                <p className="text-white text-xl">{bankAccount.accountName}</p>
                                <button className="bg-black text-white px-4 py-2 mt-2 rounded-md font-medium">Withdraw</button>
                            </div>
                        ))}
                    </div>



                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => router.push("/student/Transactions/addBank")}
                            className="bg-black text-white font-bold text-2xl px-7 py-2 rounded-2xl"
                        >
                            Link Bank
                        </button>
                    </div>

                </>
            </StuLayout>
        )
    }

}