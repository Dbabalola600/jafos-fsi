import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StuLayout from "../Layout/StuLayout";




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
        const token = getCookie("Normuser")
        const body = {
            id: token
        }

        const response = await fetch("/api/fetchTransHistory", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as TransHists[]

        setHistory(response)




        // const response = await fetch("/api/fetchHistory", {method:"POST", body:JSON.stringify(body)})
        // .then(res => res.json()) as TransHists[]

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
                            //  className={
                            //     `${hist.trans_type === "CREDIT"  ? " text-green-400"  : ""}
                               
                            //     text-red-600`
                            
                            // } 
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
        </StuLayout >
    )
}

