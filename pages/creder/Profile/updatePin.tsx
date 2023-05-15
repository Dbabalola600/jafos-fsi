import { FormEventHandler, useState } from "react";
import Header from "../../../components/shared/Header";
import TextInput from "../../../components/shared/TextInput";
import CredLayout from "../Layout/credLayout";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import ErrMess from "../../../components/shared/ErrMess";









export default function UpdatePin() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const [showtoast, settoast] = useState({ message: "", show: false })





    const update: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Creduser")



        const body = {
            id: info,
            o_pin: form.item(0).value,
            n_pin: form.item(1).value
        }

        const response = await fetch("/api/creder/profile/updatePin", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/creder/Profile")
                } if (res.status === 401) {
                    settoast({ message: " message", show: true })

                }
            }).catch(err => {
                console.log(err)
            })






        setLoading(false)
    }




    return (
        <CredLayout>

            <>
                <Header
                    title="Update Pin"
                />




                <form
                    onSubmit={update}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >


                    {showtoast.show && <ErrMess title="invalid  Pin" />}

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="*********"
                            name="Current Pin"
                            type='number'

                        />
                    </div>

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="*********"
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



        </CredLayout>
    )
}