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
    user: string
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

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">
                    {tokens.map((token: {
                        _id: string
                        token: string
                        amount: number
                        status: string
                        usedBy: string
                        madeBy: string
                        user: string
                    }) =>
                        <div
                            key={token._id}
                        >
                            <div className="bg-primary rounded-lg  p-3 ">

                                <div
                                    className="items-center justify-center "
                                >


                                </div>
                                <div className="flex items-end space-x-3">

                                    <div className="w-1/2  text-left relative">


                                        <div className="text-black   font-bold text-lg">
                                            Token:  {token.token}
                                        </div>

                                        <p
                                            className="text-gray-400"
                                        >
                                            Amount:{token.amount}
                                        </p>
                                        <p
                                            className="text-gray-400"
                                        >
                                            User:{token.user}
                                        </p>
                                    </div>
                                </div>

                            </div>


                        </div>



                    )}
                </div>




            </>
        </CredLayout>
    )
}