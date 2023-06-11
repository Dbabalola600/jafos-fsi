import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import GoodMess from "../../../components/shared/GoodMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StaffLay from "../Layout/StaffLay";
import TokenUserCard from "../../../components/shared/TokenUserCard";
import EmptyTrans from "../../../components/shared/Empty States/EmptyTrans";







type Tokens = {
    _id: string
    token: string
    amount: number
    status: string
    usedBy: string
    madeBy: string
    user: string
}

export default function CreditAccount() {

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showgtoast, setgtoast] = useState({ message: "", show: false })

    const [tokens, setTokens] = useState<Tokens[]>([])




    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    useEffect(() => {
        if (showgtoast.show) {
            setTimeout(() => {
                setgtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgtoast.show])


    const Credit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Staffuser")


        const body = {
            id: info,
            tok: form.item(0).value
        }

        const response = await fetch("/api/staff/transactions/credit", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgtoast({ message: " message", show: true })
                    router.push("/staff/DashBoard")
                    return res.json()
                }
                if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 500) {
                    settoast({ message: " message", show: true })
                }
            }).catch(err => {
                console.log(err)
            })



        setLoading(false)
    }


    const showinfo = async () => {
        const token = getCookie("Staffuser")

        const body = {
            id: token
        }

        const response = await fetch("/api/staff/token/getTokens", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Tokens[]


        setTokens(response)




    }


    useEffect(() => {
        showinfo()
    }, []
    )


    if (tokens[0] === undefined) {
        return (
            <StaffLay>
                <>

                    <Header
                        title=" credit your account"
                    />

                    <EmptyTrans
                    />
                    <div
                        className="mt-20"
                    >
                        <Header
                            title="no tokens available for user please visit a creder to credit your acount"
                        />
                    </div>






                </>
            </StaffLay>
        )
    } else {
        return (
            <StaffLay>
                <>

                    <Header
                        title=" credit your account"
                    />

                    {/* <form
                        onSubmit={Credit}
                        className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                    >
    
    
                        {showgtoast.show && <GoodMess title="Account has been Credited" />}
    
                        {showtoast.show && <ErrMess title="invalid Token" />}
    
    
    
                        <div className="mx-auto  w-full ">
                            <TextInput
                                placeholder="Token"
                                name="Token"
                                type='text'
    
                            />
                        </div>
    
    
                        <div className=" w-full  space-y-6">
    
                            <button className="w-full btn-primary btn "
                                type="submit">
                                {isLoading ? "Loading..." : "Proceed"}
    
                            </button>
    
    
    
                        </div>
    
                    </form> */}




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

                                <form
                                    onSubmit={Credit}
                                >
                                    <TokenUserCard
                                        token={token.token}
                                        amount={token.amount}
                                    // butt={Credit}
                                    />
                                </form>





                            </div>



                        )}
                    </div>

                </>
            </StaffLay>
        )
    }



}