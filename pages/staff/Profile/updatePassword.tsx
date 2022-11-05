import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import Header from "../../../components/shared/Header"
import TextInput from "../../../components/shared/TextInput"
import StaffLay from "../Layout/StaffLay"


export default function index() {

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)




    const update: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Staffuser")



        const body = {
            id: info,
            n_pass: form.item(0).value
        }

        const response = await fetch("/api/staff/profile/updatePassword", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/staff/Profile")
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

