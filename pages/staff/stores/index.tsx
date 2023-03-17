import Link from "next/link";
import { Key, useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StoreButton from "../../../components/shared/storeButt";
import StaffLay from "../Layout/StaffLay";





type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
    status: string
}




function Index() {

    const [sellers, SetSellers] = useState<Sellers[]>([])

    const showOffer = async () => {

        const response = await fetch("/api/staff/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]



        SetSellers(response)

        console.log(response)

    }


    useEffect(() => {

        showOffer()
    }, [])



    return (
        <StaffLay>

            <>
                <Header
                    title="Avaialable stores"
                />

                {sellers.map((seller: {
                    _id: Key | null | undefined;
                    status: string;
                    storename: string;
                }) =>
                    <div
                        key={seller._id}
                    >



                        <StoreButton
                            ulink={`/staff/stores/${seller._id}`}
                            name={seller.storename}
                            status={seller.status}
                            desc="description "
                        />

                    </div>
                )}

            </>
        </StaffLay>
    )
}



export default Index
