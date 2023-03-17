import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import CusModal from "../../../components/shared/modal";
import AdminLayout from "../Layout/AdminLayout";




type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}

type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}



export default function Stores() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers[]>([]);
    const [seller, setSeller] = useState<Seller | null>(null);

    let ssd = router.query

    const Showinfo = async () => {
        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/admin/seller/fetchSellerId", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

    }


    useEffect(() => {
        Showinfo()
    }, []
    )



    return (
        <AdminLayout>
            <>
                <Header
                    title={seller?.storename}
                />

                <div
                    className="w-full py-20 space-y-12"
                >



                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Sellers/orders/">
                            <button className="btn btn-lg btn-primary btn-block">
                                Orders
                            </button>
                        </Link>
                    </div>



                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Sellers/products/">
                            <button className="btn btn-lg btn-primary btn-block">
                                Products
                            </button>
                        </Link>
                    </div>



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