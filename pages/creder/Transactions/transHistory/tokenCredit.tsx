import Link from "next/link";
import Header from "../../../../components/shared/Header";
import CredLayout from "../../Layout/credLayout";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import HistBarCred from "../../../../components/shared/historyBarCred";






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



type TransHistAmt = {

    w_hist: number | any
    all: number | any
    tok: number | any
}



export default function TransHistoryTokCred() {
    const [histAmt, setHistAmt] = useState<TransHistAmt | null>(null)

    const [hists, setHistory] = useState<TransHists[]>([])

    const showinfo = async () => {
        const token = getCookie("Creduser")
        const body = {
            id: token
        }

        const response = await fetch("/api/transactionHistory/Creder/fetchTok", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)





        const Amtresponse = await fetch("/api/transactionHistory/Creder/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)
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




                <HistBarCred
                    WithAmt={histAmt?.w_hist}
                    WithLink={"/creder/Transactions/transHistory/withdraw"}
                    allAmt={histAmt?.all}
                    allLink={"/creder/Transactions/transHistory/"}
                    tokenAmt={histAmt?.tok}
                    tokenLink={"/creder/Transactions/transHistory/tokenCredit"}

                />


                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">

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
                                className={"text-orange-500  mb-6 "}

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

            </div>
        </CredLayout>
    )
}