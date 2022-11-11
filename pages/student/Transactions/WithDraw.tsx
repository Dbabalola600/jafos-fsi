import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, Key, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import HeadButton from "../../../components/shared/HeadButton";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";
import GoodMess from "../../../components/shared/GoodMess";

export default function Withdraw(){

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })




    const [showgoodtoast, setgoodtoast ] = useState({  message: "", show:false }) 

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])




    const trans: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Normuser")
        console.log(info)

        const body = {
            sen: info,
            rec: form.item(0).value,
            amt: form.item(1).value,
            pin: form.item(2).value
        }



        const respone = await fetch("/api/student/transactions/withdraw", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })
                   
                    router.push("/student/DashBoard")
                }
                if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 245) {
                    settoast2({ message: " message", show: true })
                }
            })


        setLoading(false)
    }










    return (
        <StuLayout>
            <>
            <Header
            title="WithDraw"
            />
            

            <form
                    onSubmit={trans}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >
                    {showtoast.show && <ErrMess title="insufficient funds" />}
                    {showtoast2.show && <ErrMess title="invalid pin" />}
                    {showgoodtoast.show && <GoodMess title="Transfer Sucessful" />}




                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Creder ID"
                            name="CREDER ID"
                            type='text'

                        />
                    </div>

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Amount"
                            name="Amount"
                            type='number'

                        />
                    </div>


                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Pin"
                            name="Pin"
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