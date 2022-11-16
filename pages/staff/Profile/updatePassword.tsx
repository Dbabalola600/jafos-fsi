import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { FormEventHandler, useEffect, useState } from "react"
import ErrMess from "../../../components/shared/ErrMess"
import Header from "../../../components/shared/Header"
import TextInput from "../../../components/shared/TextInput"
import StaffLay from "../Layout/StaffLay"


export default function index() {

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

        const info = getCookie("Staffuser")



        const body = {
            id: info,
            o_pass: form.item(0).value,
            n_pass: form.item(1).value
        }

        const response = await fetch("/api/staff/profile/updatePassword", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/staff/Profile")
                } if (res.status === 401) {
                    settoast({ message: " message", show: true })

                }
            }).catch(err => {
                console.log(err)
            })






        setLoading(false)
    }


    return (
        <StaffLay>
            <>
                <Header
                    title="Update Password"
                />




                <form
                    onSubmit={update}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >


                    {showtoast.show && <ErrMess title="invalid  password" />}

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="*********"
                            name="Current Password"
                            type='text'

                        />
                    </div>

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="*********"
                            name="New Password"
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
        </StaffLay>
    )
}

