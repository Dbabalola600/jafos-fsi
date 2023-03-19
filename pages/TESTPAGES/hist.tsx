import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
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


type TransHistAmt = {
    debit: number |any
    credit: number |any
    all: number | any
    tok: number |any
}

export default function Hist() {




    const [hists, setHistory] = useState<TransHists[]>([])
    const [histAmt, setHistAmt] = useState<TransHistAmt|null>(null)
    

    const showinfo = async () => {
        const token = getCookie("Normuser")
        const body = {
            id: "640f880c8e4bb44012b33af6"
        }

        const response = await fetch("/api/fetchTransHistory", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)




        const Amtresponse = await fetch("/api/transactionHistory/fetchTransAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHistAmt

        setHistAmt(Amtresponse)

        // console.log(Amtresponse.debit)
        


    }



    useEffect(() => {
        showinfo()

    }, [])

    console.log(histAmt?.all)

    // let sum = histAmt[0].all
    // console.log(sum)


    const transactions = [
        { transType: "ALL", amount: `${histAmt?.all}`, link: "/", ink: "primary" },
        { transType: "Debit", amount: "53", link: "/", ink: "red-500" },
        { transType: "Credit", amount: "533", link: "/", ink: "green-500" },
        { transType: "TOKEN Credit", amount: "5fe", link: "/", ink: "orange-500" },
      
    ]


    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>





                <div
                    className="grid grid-flow-col  overflow-x-scroll mt-10 p-5   gap-5  "
                >


                    {transactions.map((transactions, index) => (
                        <div key={index}
                            className={`bg-${transactions.ink} rounded-xl  mx-auto w-28 hover:cursor-pointer hover:bg-black hover:text-white text-black `}
                        >
                            <Link
                                href={transactions.link}
                            >
                                <a
                                    className="font-bold mx-2 text-[10px] text-left"
                                >
                                    {transactions.transType} {"   "} {transactions.amount}
                                    

                                </a>
                            </Link>


                        </div>
                    ))}

                </div>









            </>
        </DefaultLayout>
    )
}