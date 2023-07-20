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





type CreditCard = {
    CardNo: string,
    CVV: string,
    ExpiryDate: string,
    pin: string
}

type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
    account_bal: number
}


export default function CreditAccount() {
    const router = useRouter()
    const [student, setStudent] = useState<Student | null>(null);
    const [bankAccounts, setBankAccounts] = useState<CreditCard[] | null>(null)


    const showinfo = async () => {


        const token = getCookie("Normuser")
        const body = {
            id: token
        }

        const response = await fetch("/api/student/account/getCard", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as CreditCard[]


        setBankAccounts(response)

        const body2 = {
            _id: token
        }
        const StudentResponse = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body2) })
        .then(res => res.json()) as Student
        
        setStudent(StudentResponse)
      

    }

    useEffect(() => {
        showinfo()

    }, [])




    if (bankAccounts === null || bankAccounts.length === 0) {
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
                        title="Credit Account"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        {bankAccounts.map((bankAccount: CreditCard) => (
                            <div className="bg-primary py-4 px-4 col-span-1 rounded-md" key={bankAccount.CardNo}>
                                <p className="text-black text-xl">{student?.firstname} {student?.lastname} </p>
                                <h1 className="text-white font-bold text-2xl">{bankAccount.CardNo}</h1>
                                <p className="text-white">{bankAccount.ExpiryDate}</p>
                                <button
                                    onClick={() => router.push(`/student/Transactions/Credit?bankId=${bankAccount.CardNo}`)}
                                    className="bg-black text-white px-4 py-2 mt-2 rounded-md font-medium"
                                >
                                    Top up
                                </button>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => router.push("/student/Transactions/addCard")}
                            className="bg-primary text-white font-bold text-2xl px-7 py-2 rounded-xl"
                        >
                            Add New Card
                        </button>
                    </div>

                </>
            </StuLayout>
        )
    }

}
