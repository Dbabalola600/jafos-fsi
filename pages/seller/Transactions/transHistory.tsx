import { getCookie } from "cookies-next";
import Header from "../../../components/shared/Header";
import CatLayout from "../Layout/CatLayout";
import { useEffect, useState } from "react";





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
        const token = getCookie("Selluser")
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
        <CatLayout>
            <>
                <Header
                    title='TRANSACTION HISTORY'
                />

                {/* <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"> */}

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
                                className={"text-primary  mb-6 bg-black mt-5 "}

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

                {/* </div> */}



            </>
        </CatLayout>
    )
}






