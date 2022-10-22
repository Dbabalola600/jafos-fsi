import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";


import CredLayout from "./Layout/credLayout";
import Header from "../../components/shared/Header";




type Creder = {
    _id: string
    creder_no: string;
    firstname: string
    lastname: string
    account_bal: number
}






export default function DashBoard() {
    const router = useRouter()
    const [creder, setCreder] = useState<Creder | null>(null);

    const showinfo = async () => {

        const token = getCookie("Creduser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/creder/fetchCreder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Creder


        setCreder(response)


    }

    useEffect(() => {
        showinfo()
    }, []
    )





    return (
        <CredLayout>
            <div
                className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <div
                    className=" bg-black md:w-60"
                >
                    <div className="text-primary text-3xl">
                        Welcome {creder?.firstname} {" "}
                        {creder?.account_bal} Credits
                    </div>



                    <div className="text-red-500">
                        {creder?.creder_no}
                    </div>
                </div>





                <div className=' mx-auto'>
                    <Link
                        href="/creder/Tokens">
                        <button className="btn btn-lg btn-primary btn-block">
                            Tokens
                        </button>
                    </Link>
                </div>



                <div className='  mx-auto'>
                    <Link
                        href="/creder/Transactions">
                        <button className="btn btn-lg btn-primary btn-block">
                            Transactions
                        </button>
                    </Link>
                </div>

            </div>
        </CredLayout>
    )
}