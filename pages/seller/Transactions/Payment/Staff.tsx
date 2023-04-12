import { useRouter } from "next/router";
import ErrMess from "../../../../components/shared/ErrMess";
import GoodMess from "../../../../components/shared/GoodMess";
import Header from "../../../../components/shared/Header";
import TextInput from "../../../../components/shared/TextInput";
import CatLayout from "../../Layout/CatLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { getCookie } from "cookies-next";











export default function Staff() {



    const router = useRouter()
    let ssd = router.query

    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })

    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })




    const trans: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Selluser")
        console.log(info)



        const body = {
            sen: form.item(0).value,
            rec: info,
            amt: form.item(1).value,
            pin: form.item(2).value
        }



        const respone = await fetch("/api/seller/transactions/RecStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/seller/DashBoard")
                }
                if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 245) {
                    settoast2({ message: " message", show: true })
                }
                if (res.status == 247) {
                    settoast3({ message: " message", show: true })
                }
            })


        setLoading(false)
    }



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
        if (showtoast3.show) {
            setTimeout(() => {
                settoast3({ message: "", show: false })
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



    return (
        <CatLayout>
            <>
                <Header
                    title='STAFF PAYMENT'
                />



                <form
                    onSubmit={trans}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >
                    {showtoast.show && <ErrMess title="insufficient funds" />}
                    {showtoast2.show && <ErrMess title="invalid pin" />}
                    {showtoast3.show && <ErrMess title="invalid USER" />}
                    {showgoodtoast.show && <GoodMess title="Transfer Sucessful" />}





                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Staff ID Number"
                            name="Staff ID Number"
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
        </CatLayout>
    )
}