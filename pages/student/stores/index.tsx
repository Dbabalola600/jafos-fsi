import { useState, useEffect } from "react";
import Header from "../../../components/shared/Header";
import StoreButton from "../../../components/shared/storeButt";
import StuLayout from "../Layout/StuLayout";








type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
    status:string
}






function index() {

    const [sellers, SetSellers] = useState<Sellers[]>([])

    const showOffer = async () => {

        const response = await fetch("/api/student/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]



        SetSellers(response)

        console.log(response)

    }


    useEffect(() => {

        showOffer()
    }, [])



    return (
        <StuLayout>

            <>
                <Header
                    title="Avaialable stores"
                />

                {sellers.map((seller: {
                     _id: string | null | undefined; 
                status:string;
                storename: string; }) =>
                    <div
                        key={seller._id}
                    >



                        <StoreButton
                            ulink={`/student/stores/${seller._id}`}
                            name={seller.storename}
                            status={seller.status}
                            desc="description "
                        />

                    </div>
                )}

            </>
        </StuLayout>
    )
}



export default index