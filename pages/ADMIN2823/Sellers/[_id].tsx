import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import CusModal from "../../../components/shared/modal";
import AdminLayout from "../Layout/AdminLayout";
import Money_Format from "../../../components/shared/money_format";




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
    store_desc: string;
    account_bal: number
    status: string
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
                    className="w-full  space-y-12"
                >


                    <div className=" text-primary mt-5 space-y-5 w-full ">

                        <div>
                            Name: {seller?.storename}


                        </div>

                        <div>
                            About: {seller?.store_desc}


                        </div>


                        <div>
                            Currently:  {seller?.status}

                        </div>


                        <div>
                            Account Balance:<Money_Format amount={seller?.account_bal} />
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

                </div>

            </>

        </AdminLayout>
    )
}