import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";


import CredLayout from "./Layout/credLayout";
import Header from "../../components/shared/Header";
import UserDash from "../../components/shared/UserDash";
import UserDash2 from "../../components/shared/UserDash2";




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
                


                <Header
                    title="DashBoard"
                />

                <UserDash2
                    AccId={creder?.creder_no}
                    accBal={creder?.account_bal}
                    name={creder?.firstname}
                  
                />



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