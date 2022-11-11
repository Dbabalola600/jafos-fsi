import Header from "../../../components/shared/Header";
import CatLayout from "../Layout/CatLayout";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Link from "next/link";





type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


export default function id() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers | null>(null);


    let ssd = router.query

    console.log(ssd._id)

    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/seller/product/fetchProduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers



        SetOffers(response)
    }



    const del = async (_id: any) => {
        const response = await fetch("/api/seller/product/delProduct", { method: "POST", body: JSON.stringify(_id) })
            .then(res => {
                if (res.status === 200) {
                    router.push("/seller/Products")
                }
            })



    }

    useEffect(() => {
        showinfo()
    }, [])

    return (
        <CatLayout>
            <>
                <Header
                    title={offers?.title}
                />

                <div className="grid grid-cols-2 space-x-10">

                    <button className="btn btn-lg btn-primary btn-block"
                        onClick={() => del(offers?._id)}
                    >
                        delete
                    </button>




                    <div className='mx-auto'>
                        <Link
                            href={`Edit/${offers?._id}`}
                        >
                            <button className="btn btn-lg btn-primary btn-block">
                                Edit
                            </button>
                        </Link>
                    </div>





                </div>

            </>
        </CatLayout>
    )
}