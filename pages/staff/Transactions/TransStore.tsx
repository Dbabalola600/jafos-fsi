import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StaffLay from "../Layout/StaffLay";






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

        const SellerResponse = await fetch("/api/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]

        SetSellers(SellerResponse)



    }

    useEffect(() => {
        showinfo()

    }, [])





    return (
        <StaffLay>
            <>
            <Header
                    title="transfer to a store"
                />




                {sellers.map((seller: { _id: string | null | undefined; storename: string; }) =>
                    <div
                        key={seller._id}
                    >
                      
                        <NavButton
                        uLink={`/staff/Transactions/store/${seller._id}`}
                        title={seller.storename}
                    />
                    </div>
                )}


            </>
        </StaffLay>
    )
}