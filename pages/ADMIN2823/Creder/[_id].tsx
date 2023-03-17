import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import CusModal from "../../../components/shared/modal";
import AdminLayout from "../Layout/AdminLayout";






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


    return (
        <AdminLayout>
            <>
                <Header
                    title={creder?.creder_no}
                />







                <CusModal
                    mainButtonTitle="Delete User"
                    smButtonTitle="Delete"
                    modalInfo="Are you sure you wish to delete the user? user will not be able to be retrieved"
                    clickButton={() => { }}
                />



            </>
        </AdminLayout>
    )
}