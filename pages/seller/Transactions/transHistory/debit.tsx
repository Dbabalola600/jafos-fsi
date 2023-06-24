import { getCookie } from "cookies-next";
import Header from "../../../../components/shared/Header";
import CatLayout from "../../Layout/CatLayout";
import { useEffect, useState } from "react";
import EmptyTrans from "../../../../components/shared/Empty States/EmptyTrans";
import HistBarCred from "../../../../components/shared/historyBarCred";
import HistBarSell from "../../../../components/shared/historyBarSell";
import useSWR from "swr";





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
    all: number | any
    cred: number | any
}



export default function TransHistoryDebit() {
    const [histAmt, setHistAmt] = useState<TransHistAmt | null>(null)
    const [hists, setHistory] = useState<TransHists[]>([])

    const token = getCookie("Selluser")



    const showinfo = async () => {
        const token = getCookie("Selluser")
        const body = {
            id: token
        }


        const response = await fetch("/api/transactionHistory/fetchDebit", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)



        const Amtresponse = await fetch("/api/transactionHistory/Seller/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)


    }




    useEffect(() => {
        showinfo()

    }, [])




    if (hists[0] === undefined) {
        return (
            <CatLayout>
                <>
                    <Header
                        title='TRANSACTION HISTORY'
                    />



                    <HistBarSell
                        debAmt={histAmt?.debit}
                        DebLink={"/seller/Transactions/transHistory/debit"}
                        allAmt={histAmt?.all}
                        allLink={"/seller/Transactions/transHistory/"}
                        credAmt={histAmt?.cred}
                        credLink={"/seller/Transactions/transHistory/credit"}

                    />
                    <EmptyTrans />
                </>
            </CatLayout>
        )
    } else {
        return (
            <CatLayout>
                <>
                    <Header
                        title='TRANSACTION HISTORY'
                    />




                    <HistBarSell
                        debAmt={histAmt?.debit}
                        DebLink={"/seller/Transactions/transHistory/debit"}
                        allAmt={histAmt?.all}
                        allLink={"/seller/Transactions/transHistory/"}
                        credAmt={histAmt?.cred}
                        credLink={"/seller/Transactions/transHistory/credit"}

                    />
                    <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">

                        {hists.map((hist: {
                            sender: string,
                            reciever: string,
                            amount: number,
                            trans_type: string,
                            send_id: string,
                            rec_id: string,
                            _id: string,
                            createdAt: string


                        }) => (
                            <div
                                key={hist._id}
                            // key={index}
                            >

                                <div
                                    className={"text-primary  mb-6  mt-5 "}

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
                                        className="pb-"
                                    >
                                        on: {hist.createdAt}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>





                </>
            </CatLayout>
        )
    }


}






