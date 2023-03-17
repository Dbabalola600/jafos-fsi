import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";





type Tokens = {
    _id: string
    token: string
    amount: number
    status: string
    usedBy: string
    madeBy: string
}







export default function Available() {
    const [tokens, setTokens] = useState<Tokens[]>([])




    const showinfo = async () => {
        const user = getCookie("Creduser")

        const body = {
            id: user
        }


        const reponse = await fetch("/api/creder/token/fetchAvailToken", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Tokens[]

        console.log(reponse)
        setTokens(reponse)

    }



    useEffect(() => {
        showinfo()

    }, [])


    return (
        <CredLayout>
            <>
                <Header
                    title=" Available Tokens"
                />
                {tokens.map((token: {
                    _id: string
                    token: string
                    amount: number
                    status: string
                    usedBy: string
                    madeBy: string
                }) =>
                    <div
                        key={token._id}
                    >

                        <Header
                            title={token.token}
                            desc={token.amount}
                        />

                    </div>



                )}



            </>
        </CredLayout>
    )
}