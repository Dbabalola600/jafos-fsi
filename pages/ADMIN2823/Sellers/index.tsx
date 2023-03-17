import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";


type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
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
                        className=" bg-black  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                            VIEW PRODUCTS
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

                {sellers.map((seller: { _id: string | null | undefined; storename: string; }) =>
                    <div
                        key={seller._id}
                    >
                        <Link
                            href={`/ADMIN2823/Sellers/${seller._id}`}
                        >
                            <a>
                                <Header
                                    title={seller.storename}
                                />
                            </a>

                        </Link>

                    </div>
                )}

            </>
        </AdminLayout>
    )

}