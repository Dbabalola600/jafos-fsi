import { useRouter } from "next/router";
import CatLayout from "../../Layout/CatLayout";
import { useEffect, useState } from "react";
import Header from "../../../../components/shared/Header";
import { getCookie } from "cookies-next";






type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}











export default function FindCateory() {


    const router = useRouter()

    const [offers, SetOffers] = useState<Offers[]>([]);




    let ssd = router.query

    const showinfo = async () => {

        const token = getCookie("Selluser")








        const body2 = {
            id: token,
            find: ssd.find
        }


        const Offerresponse = await fetch("/api/seller/product/filter/findByCategory", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)

    }

    useEffect(() => {
        showinfo()
    }, []
    )


    const del = async (_id: any) => {

        const body = {
            id: _id
        }
        const response = await fetch("/api/seller/product/delProduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    router.reload()
                }
            })



    }




    return (
        <CatLayout>
            <>

                <Header
                    title={"Category: " + ssd.find}
                />




                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >

                    {offers.map((offer: {
                        description: string
                        price: number
                        title: string;

                        _id: string | null | undefined

                    }) => (
                        <div
                            key={offer._id}

                        >


                            <div className="bg-primary rounded-lg p-3 pb-5 ">


                                <div className="flex items-end space-x-3 break-words">

                                    <div className="w-full  text-left relative">


                                        <div className="text-black   font-bold text-lg">
                                            {offer.title}
                                        </div>

                                        <p
                                            className="text-gray-400"
                                        >
                                              ₦  {offer.price}
                                        </p>
                                    </div>
                                </div>






                                <div
                                    className=" grid lg:grid-cols-2 gap-6 pt-5 grid-cols-1"

                                >
                                    <button

                                        onClick={() => del(offer._id)}
                                        className="btn bg-black float-right "
                                    > Delete
                                    </button>



                                    <button
                                        onClick={() => router.push(`/seller/Products/Edit/${offer._id}`)}
                                        className="btn bg-black float-right "
                                    > EDIT
                                    </button>


                                </div>

                            </div>




                        </div>
                    ))}
                </div>


            </>
        </CatLayout>
    )
}