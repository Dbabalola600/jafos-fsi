import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, Key, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import HeadButton from "../../../components/shared/HeadButton";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";





type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}







export default function TransStore() {



    const [sellers, SetSellers] = useState<Sellers[]>([])
    const router = useRouter()




    const showinfo = async () => {

        const SellerResponse = await fetch("/api/student/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]

        SetSellers(SellerResponse)



    }

    useEffect(() => {
        showinfo()

    }, [])


    return (
        <StuLayout>
            <>

                <Header
                    title="transfer to a store"
                />




                <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">
                    {sellers.map((seller: { _id: string | null | undefined; storename: string; }) =>
                        <div
                            key={seller._id}
                        >

                            <NavButton
                                uLink={`/student/Transactions/store/${seller._id}`}
                                title={seller.storename}
                            />
                        </div>
                    )}
                </div>


            </>
        </StuLayout>
    )
}