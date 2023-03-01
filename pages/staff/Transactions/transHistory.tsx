import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import GoodMess from "../../../components/shared/GoodMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StaffLay from "../Layout/StaffLay";


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



export default function transHistory() {

    const [hists, setHistory] = useState<TransHists[]>([])


    const showinfo = async () => {
        const token = getCookie("Staffuser")
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
        <StaffLay>
            <>

                <Header
                    title=""
                />

                <Header
                    title="History"
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
                            className={
                                `${hist.trans_type === "CREDIT"  ? " text-green-400"  : ""}
                                   
                                text-red-600  mb-6 bg-black`
                            }

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


            </>
        </StaffLay>
    )
}