import Link from "next/link";
import Header from "../../../../components/shared/Header";
import CredLayout from "../../Layout/credLayout";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import HistBarCred from "../../../../components/shared/historyBarCred";
import useSWR from "swr";
import EmptyTrans from "../../../../components/shared/Empty States/EmptyTrans";





type Data = {
    pagination: {
        count: number
        pageCount: number
    }
    history: {
        sender: string
        reciever: string
        amount: number
        trans_type: string
        send_id: string
        rec_id: string
        _id: string
        createdAt: string
    }[]

}

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



const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());


export default function TransHistory() {
    const [histAmt, setHistAmt] = useState<TransHistAmt | null>(null)
    // const [hists, setHistory] = useState<TransHists[]>([])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const token = getCookie("Creduser")

    const { data, error } = useSWR(
        `/api/fetchTransHistoryPa?page=${page}&id=${token}`,
        fetcher
    )


    const showinfo = async () => {
        const token = getCookie("Creduser")
        const body = {
            id: token
        }


 




        const Amtresponse = await fetch("/api/transactionHistory/Creder/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)
    }


    function handlePrevious() {
        setPage((p) => {
            if (p === 1) return p
            else {
                return p - 1;
            }

        })
    }

    function handleNext() {
        setPage((p) => {
            if (p === pageCount) return p;
            else {
                return p + 1;
            }

        })
    }

    useEffect(() => {
        showinfo()

    }, [])

    useEffect(() => {
        if (data) {
            setPageCount(data.pagination.pageCount)
        }
    }, [data])




    if (data?.history[0] === undefined) {
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




                    <EmptyTrans />




                </div>
            </CredLayout>
        )
    } else {

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

                        {data?.history.map((hist: {
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
                                    className={"text-primary  mb-6 bg-"}

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

                    <div
                        className="mt-5 space-x-5 text-black flex justify-center "
                    >



                        <button
                            disabled={page === 1}
                            onClick={handlePrevious}
                            className="bg-black rounded-lg text-white p-3"
                        >
                            Previous
                        </button>
                        <div>
                            Page: {page}
                        </div>



                        <button
                            disabled={page === pageCount}
                            onClick={handleNext}
                            className="bg-black rounded-lg text-white p-3"
                        >
                            Next
                        </button>
                    </div>





                </div>
            </CredLayout>
        )
    }


}