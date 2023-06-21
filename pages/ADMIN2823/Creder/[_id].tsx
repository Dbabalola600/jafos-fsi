import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import CusModal from "../../../components/shared/modal";
import AdminLayout from "../Layout/AdminLayout";
import Money_Format from "../../../components/shared/money_format";






type Creder = {
    _id: string
    creder_no: string;
    firstname: string
    lastname: string
    account_bal: number
}








export default function Creders() {
    const router = useRouter()
    const [creder, SetCreder] = useState<Creder | null>(null)
    const [isLoading, setLoading] = useState(false)


    let ssd = router.query

    const showinfo = async () => {
        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/admin/creder/fetchCrederId", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Creder


        SetCreder(response)

    }

    useEffect(() => {
        showinfo()
    }, []
    )

    const delOne = async () => {
        setLoading(true)
        const body = {
            user: ssd._id
        }

        const response = await fetch("/api/admin/creder/deleteCreder", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/ADMIN2823/Creder")
                }
            })



        setLoading(false)
    }

    return (
        <AdminLayout>
            <>
                <Header
                    title={creder?.creder_no}
                />


                <div className=" text-primary mt-5 space-y-5 w-full ">

                    <div>
                        Name: {creder?.firstname} {creder?.lastname}


                    </div>

                    <div>
                        Creder Id: {creder?.creder_no}


                    </div>





                    <div>
                        Account Balance:<Money_Format amount={creder?.account_bal} />
                    </div>

                </div>



                <div
                    className="mt-10"
                >
                    <CusModal
                        mainButtonTitle="Delete User"
                        smButtonTitle="Delete"
                        modalInfo="Are you sure you wish to delete the user? user will not be able to be retrieved"
                        clickButton={() => { }}
                    />
                </div>




            </>
        </AdminLayout>
    )
}