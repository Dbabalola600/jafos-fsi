import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";
import StoreButton from "../../../components/shared/storeButt";


type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
    status: string
    store_desc: string
}




export default function Index() {
    const [sellers, SetSellers] = useState<Sellers[]>([])
    const router = useRouter()

    const Showinfo = async () => {
        const SellerResponse = await fetch("/api/admin/seller/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]

        SetSellers(SellerResponse)

        // console.log(SellerResponse)

    }


    useEffect(() => {
        Showinfo()

    }, [])

    return (
        <AdminLayout>
            <>


                <div className="grid grid-cols-2 space-x-10">

                    <div
                        className=" bg-  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                           All Sellers
                        </div>
                    </div>




                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Sellers/newSeller">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Seller
                            </button>
                        </Link>
                    </div>





                </div>

                




                <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">



                    {sellers.map((seller: {
                        _id: string;
                        status: string;
                        storename: string;
                        store_desc: string
                    }) =>
                        <div
                            key={seller._id}
                        >






                            <StoreButton
                                ulink={`/ADMIN2823/Sellers/${seller._id}`}
                                name={seller.storename}
                                status={seller.status}
                                desc={seller.store_desc}
                            />











                        </div>
                    )}



                </div>
            </>
        </AdminLayout>
    )

}