import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";
import TokenUserCard from "../../../components/shared/TokenUserCard";
import EmptyTrans from "../../../components/shared/Empty States/EmptyTrans";
import Image from "next/image";
import empty_card from "../../../public/empty_card.svg"



type Tokens = {
    _id: string
    token: string
    amount: number
    status: string
    usedBy: string
    madeBy: string
    user: string
}


type CreditCard = {
    accountNumber: number;
    bankCode: number;
    bankName: string;
    accountName: string;
}



export default function CreditAccount() {
    const router = useRouter()

    // const [bankAccounts, setBankAccounts] = useState<CreditCard[] | null>(null)
    const [bankAccounts, setBankAccounts] = useState<CreditCard[] | null>([
        {
            accountNumber: 1000005997,
            bankCode: 2001,
            bankName: "Eco bank ",
            accountName: "Oghene Victor"
        },
        {
            accountNumber: 1000945678,
            bankCode: 2301,
            bankName: "Access Bank",
            accountName: "Victor Oghene"
        },
    ])

    if (bankAccounts === null) {
        return (
            <StuLayout>
                <>
                    <Header
                        title="Credit Your card"
                    />

                    <h1 className="text-center text-xl text-primary font-medium">Link your credit or debit card</h1>

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
                            <h1 className="text-center font-bold text-2xl text-black">Debit/Credit Cards</h1>
                            <p className="text-center font-medium text-2xl text-black">Transfer money from your jafos account to your bank Card</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={() => router.push("/student/Transactions/addBank")}
                            className="bg-black text-white font-bold text-2xl px-7 py-2 rounded-2xl"
                        >
                            Link Card
                        </button>
                    </div>

                </>
            </StuLayout>
        )
    } else {



        //populated cards
        return (
            <StuLayout>
                <>
                    <Header
                        title="Withdraw from Wallet"
                    />

                    <div className="grid lg:grid-cols-2 grid-cols-1  gap-11">
                    {bankAccounts && bankAccounts.map((bankAccount: CreditCard) => (
                        <div className="bg-primary py-1 px-5 col-span-1 rounded-3xl" key={bankAccount.bankCode}>
                            <p className="text-white">{bankAccount.bankName}</p>
                            <h1 className="text-white font-bold text-l">{bankAccount.accountNumber}</h1>
                            <p className="text-white text-l">{bankAccount.accountName}</p>
                            <button className="bg-black text-white px-4 py-1 mt-1 rounded-md font-medium">Withdraw</button>
                        </div>
                    ))}
                     <div className="flex justify-center mt-4">
                        <button 
                            onClick={() => router.push("/student/Transactions/addCard")}
                            className="bg-primary text-white font-bold text-2xl px-7 py-2 rounded-xl"
                        >
                          Add New Card
                        </button>
                    </div>
                        
                     </div>
                 
                </>
            </StuLayout>
        )
    }

}
