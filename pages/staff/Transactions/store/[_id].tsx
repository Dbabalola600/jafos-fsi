import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../../components/shared/ErrMess";
import Header from "../../../../components/shared/Header";
import TextInput from "../../../../components/shared/TextInput";
import StaffLay from "../../Layout/StaffLay";



type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}






export default function stores() {



    const router = useRouter()

    const [seller, setSeller] = useState<Seller | null>(null);
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })


    
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
                settoast3({ message: "", show: false })
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



    let ssd = router.query
    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/store/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response["storename"])




    }



    useEffect(() => {
        showinfo()
    }, []
    )


    const trans: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any

        const info = getCookie("Staffuser")
        console.log(info)

        

        const body = {
            sen: info,
            rec: ssd._id,
            amt: form.item(0).value,
            pin: form.item(1).value
        }



        const respone = await fetch("/api/staff/transactions/TransStore", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/staff/DashBoard")
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




    return (
        <StaffLay>
            <>
                <Header
                    title={seller?.storename}
                />



                <form
                    onSubmit={trans}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >
                    {showtoast.show && <ErrMess title="insufficient funds" />}
                    {showtoast2.show && <ErrMess title="invalid pin" />}
                    {showtoast3.show && <ErrMess title="store not open" />}






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
        </StaffLay>
    )
}