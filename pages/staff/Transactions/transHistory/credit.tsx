import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../../components/shared/ErrMess";
import GoodMess from "../../../../components/shared/GoodMess";
import Header from "../../../../components/shared/Header";
import TextInput from "../../../../components/shared/TextInput";
import StaffLay from "../../Layout/StaffLay";
import HistBar from "../../../../components/shared/historyBar";
import Money_Format from "../../../../components/shared/money_format";
import EmptyTrans from "../../../../components/shared/Empty States/EmptyTrans";


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


export default function TransCredit() {
    const [hists, setHistory] = useState<TransHists[]>([])
    const [histAmt, setHistAmt] = useState<TransHistAmt | null>(null)


    const showinfo = async () => {
        const token = getCookie("Staffuser")
        const body = {
            id: token
        }

        const response = await fetch("/api/transactionHistory/fetchCredit", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)


        const Amtresponse = await fetch("/api/transactionHistory/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)


    }
    console.log(hists)

    useEffect(() => {
        showinfo()

    }, [])



    if (hists[0] === undefined) {
        return (
            <StaffLay>
                <>

                    <Header
                        title=" Credit Transactions History"
                    />

                    <HistBar
                        allAmt={histAmt?.all}
                        allLink={"/staff/Transactions/transHistory/"}
                        creditAmt={histAmt?.credit}
                        creditLink={"/staff/Transactions/transHistory/credit"}
                        debitAmt={histAmt?.debit}
                        debitLink={"/staff/Transactions/transHistory/debit"}
                        tokenAmt={histAmt?.tok}
                        tokenLink={"/staff/Transactions/transHistory/tokenCredit"}
                    />


                    <EmptyTrans />


                </>
            </StaffLay>
        )
    } else {
        return (
            <StaffLay>
                <>

                    <Header
                        title=" Credit Transactions History"
                    />

                    <HistBar
                        allAmt={histAmt?.all}
                        allLink={"/staff/Transactions/transHistory/"}
                        creditAmt={histAmt?.credit}
                        creditLink={"/staff/Transactions/transHistory/credit"}
                        debitAmt={histAmt?.debit}
                        debitLink={"/staff/Transactions/transHistory/debit"}
                        tokenAmt={histAmt?.tok}
                        tokenLink={"/staff/Transactions/transHistory/tokenCredit"}
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
                                className={"text-green-500  mb-6 bg-black"}

                            >
                                <div>
                                    from {hist.sender} to {hist.reciever}
                                </div>


                                <div>
                                    Amount:<Money_Format amount={hist.amount} />
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


                </>
            </StaffLay>
        )
    }




}