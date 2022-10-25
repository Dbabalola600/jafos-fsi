import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, Key, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import HeadButton from "../../../components/shared/HeadButton";
import Header from "../../../components/shared/Header";
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




                {sellers.map((seller: { _id: Key | null | undefined; storename: string; }) =>
                    <div
                        key={seller._id}
                    >
                        <Link
                            href={`/student/Transactions/store/${seller._id}`}
                        >
                            <a>
                                <HeadButton
                                    title={seller.storename}

                                />
                            </a>


                        </Link>

                    </div>
                )}

            </>
        </StuLayout>
    )
}