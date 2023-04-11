import Link from "next/link";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";






type TransHists = {

    sender: string
    reciever: string
    amount: number
    trans_type: string
    send_id: string
    rec_id: string
    _id: string
    createdAt: string


}







export default function TransHistory() {


    const [hists, setHistory] = useState<TransHists[]>([])

    const showinfo = async () => {
        const token = getCookie("Creduser")
        const body = {
            id: token
        }

        const response = await fetch("/api/fetchTransHistory", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)
    }


    console.log(hists)

    useEffect(() => {
        showinfo()

    }, [])



    return (
        <CredLayout>
            <div
                className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <Header
                    title="Transaction History"
                />

                {hists.map((hist: {
                    sender: string,
                    reciever: string,
                    amount: number,
                    trans_type: string,
                    send_id: string,
                    rec_id: string,
                    _id: string,
                    createdAt: string


                }, index) => (
                    <div
                        key={hist._id}
                    // key={index}
                    >

                        <div
                            className={"text-primary  mb-6 bg-black"}

                        >
                            <div>
                                from {hist.sender} to {hist.reciever}
                            </div>


                            <div>
                                Amount: {hist.amount}
                            </div>



                            <div

                            >
                                Transfer Type: {hist.trans_type}
                            </div>

                            <p
                                className="pb-5"
                            >
                                on: {hist.createdAt}
                            </p>

                        </div>

                    </div>
                ))}


            </div>
        </CredLayout>
    )
}