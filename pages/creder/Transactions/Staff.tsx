import Link from "next/link";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";
import NavButton from "../../../components/shared/NavButton";
import TextInput from "../../../components/shared/TextInput";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import GoodMess from "../../../components/shared/GoodMess";
import { getCookie } from "cookies-next";








export default function StaffWithDraw() {

 

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })

    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })







    // utilize the staff witdraw api 
    const trans: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any
      
        const token = getCookie("Creduser")


        const body = {
            sen: form.item(0).value,
            rec: token,
            amt: form.item(1).value,
            pin: form.item(2).value
        }



        const respone = await fetch("/api/creder/transactions/StaffWithdraw", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.push("/creder/DashBoard")
                }
                if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 245) {
                    settoast2({ message: " message", show: true })
                }
                if (res.status == 500) {
                    settoast3({ message: " message", show: true })
                }
            })


        setLoading(false)
    }

    return (
        <CredLayout>
            <div
                className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <Header
                    title="Staff WITHDRAW"
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
                            placeholder="Staff ID"
                            name="Staff ID"
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






            </div>
        </CredLayout>
    )
}