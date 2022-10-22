import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";








export default function CreditAccount() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })




    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])



    const Credit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Normuser")


        const body = {
            id: info,
            tok: form.item(0).value
        }

        const response = await fetch("/api/student/transactions/credit", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/student/DashBoard")
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


    return (
        <StuLayout>
            <>
                <Header
                    title="credit your account"
                />


                <form
                    onSubmit={Credit}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >

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

                </form>
            </>
        </StuLayout>
    )
}