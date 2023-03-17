import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";



export default function Index() {

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



    const update: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Normuser")



        const body = {
            id: info,
            o_pin: form.item(0).value,
            n_pin: form.item(1).value
        }

        const response = await fetch("/api/student/profile/updatePin", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/student/Profile")
                } if (res.status === 401) {
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
                    title="Update Pin"
                />


                <form
                    onSubmit={update}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >


                    {showtoast.show && <ErrMess title="invalid  pin" />}


                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="* * * *"
                            name="Current Pin"
                            type='number'

                        />
                    </div>


                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="* * * *"
                            name="New Pin"
                            type='number'

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

