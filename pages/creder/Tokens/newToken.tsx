import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import CredLayout from "../Layout/credLayout";













export default function newToken() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })




    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showtoast2.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])


    const newTok: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const token = getCookie("Creduser")

        const body = {
            amount: form.item(0).value,
            pin: form.item(1).value,
            credid: token
        }

        const response = await fetch("/api/creder/token/newToken", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/creder/Tokens/available")
                } if (res.status == 245) {
                    settoast({ message: " message", show: true })
                } 

            }).catch(err => {
                console.log(err)
            })





            .catch(err => {
                console.log(err)
            })
    }

    return (
        <CredLayout>
            <>
                <Header
                    title="New Tokens"
                />

                <form
                   className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                onSubmit={newTok}
                >
                    {showtoast.show && <ErrMess title="invalid pin" />}
                    {showtoast2.show && <ErrMess title="Try again Later" />}









                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Amount"
                            name="Amount"
                            type='number'

                        />
                    </div>

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder=" Pin"
                            name="Pin"
                            type='number'

                        />
                    </div>




                    <div className=" w-full  space-y-6">

                        <button className="w-full btn-primary btn "
                            type="submit">
                            {isLoading ? "Loading..." : "Create Token"}

                        </button>



                    </div>




                </form>

            </>
        </CredLayout>
    )
}