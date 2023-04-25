import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Header from "../../../../components/shared/Header";
import NavButton from "../../../../components/shared/NavButton";
import StuLayout from "../../Layout/StuLayout";
import Link from "next/link";
import HistBar from "../../../../components/shared/historyBar";




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
    debit: number | any
    credit: number | any
    all: number | any
    tok: number | any
}


export default function TransHistoryToken() {
    const [hists, setHistory] = useState<TransHists[]>([])
    const [histAmt, setHistAmt] = useState<TransHistAmt | null>(null)



    const showinfo = async () => {
        const token = getCookie("Normuser")
        const body = {
            id: token
        }

        const response = await fetch("/api/transactionHistory/fetchTokenCredit", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)




        const Amtresponse = await fetch("/api/transactionHistory/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)
        // setHistory(response)
    }


    console.log(hists)

    useEffect(() => {
        showinfo()

    }, [])







    return (
        <StuLayout>
            <>
                <Header
                    title=" Token Credit Transactions History"
                />



                <HistBar
                    allAmt={histAmt?.all}
                    allLink={"/student/Transactions/transHistory/"}
                    creditAmt={histAmt?.credit}
                    creditLink={"/student/Transactions/transHistory/credit"}
                    debitAmt={histAmt?.debit}
                    debitLink={"/student/Transactions/transHistory/debit"}
                    tokenAmt={histAmt?.tok}
                    tokenLink={"/student/Transactions/transHistory/tokenCredit"}
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
                                className={"text-orange-600  mb-6 bg-"}

                            >
                                <div>
                                    from {hist.sender} to {hist.reciever}
                                </div>


                                <div>
                                    Amount: {hist.amount}
                                </div>



                                <div>
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


            </>
        </StuLayout >
    )
}

