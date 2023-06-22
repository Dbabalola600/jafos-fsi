import { getCookie } from "cookies-next";
import Link from "next/link";
import { FormEventHandler, Key, useEffect, useState } from "react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import Header from "../../../components/shared/Header";

import CatLayout from "../Layout/CatLayout";


import { useRouter } from "next/router"
import ProductBar from "../../../components/shared/ProductsBar";
import EmptyCart from "../../../components/shared/Empty States/EmptyCart";
import useSWR from "swr";


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



type Categories = {
    _id: string

    category: string
}



const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

function Offerings() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [offers, SetOffers] = useState<Offers[]>([]);
    const [category, Setcategory] = useState<[]>([])

    


    const showinfo = async () => {

        const token = getCookie("Selluser")
        console.log(token)
        //fetch seller
        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller
        console.log(response.storename)





        //fetch categories
        const body3 = {
            id: token
        }



        const CategoryResponse = await fetch("/api/seller/product/filter/findCategory", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json())


        Setcategory(CategoryResponse)

    }


    function handlePrevious() {
        setPage((p) => {
            if (p === 1) return p
            else {
                return p - 1;
            }

        })
    }

    function handleNext() {
        setPage((p) => {
            if (p === pageCount) return p;
            else {
                return p + 1;
            }

        })
    }


   
    useEffect(() => {
        showinfo()
    }, []
    )



    const token = getCookie("Selluser")
    const { data, error } = useSWR(
        `/api/seller/fetchOffer?page=${page}&id=${token}`,
        fetcher
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




    useEffect(() => {
        if (data) {
            setPageCount(data.pagination.pageCount)
        }
    }, [data])


    //search

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value

        }

        router.push(`/seller/Products/find/${form.item(0).value}`)
    }


    if (data?.offers[0] === undefined) {
        return (
            <CatLayout>
                <>



                    <div className="grid grid-cols-2 space-x-10">

                        <div
                            className=" ">
                            <div
                                className="text-center text-primaryColour font-bold mx-auto text-2xl">
                                All Products
                            </div>
                        </div>




                        <div className='  mx-auto'>
                            <Link
                                href="/seller/Products/newProduct">
                                <button className="btn btn-lg btn-primary btn-block">
                                    Add Product
                                </button>
                            </Link>
                        </div>





                    </div>


                    <EmptyCart />
                </>
            </CatLayout>
        )
    } else {
        return (
            <CatLayout>
                <>



                    <div className="grid grid-cols-2 space-x-10">

                        <div
                            className=" ">
                            <div
                                className="text-center text-primaryColour font-bold mx-auto text-2xl">
                                All Products
                            </div>
                        </div>




                        <div className='  mx-auto'>
                            <Link
                                href="/seller/Products/newProduct">
                                <button className="btn btn-lg btn-primary btn-block">
                                    Add Product
                                </button>
                            </Link>
                        </div>





                    </div>


                    <form
                        onSubmit={search}

                    >
                        <div
                            className="text-center text-primary mb-3  mt-10"
                        >
                            search for a product or category(eg. food, water, mouse pad etc)
                        </div>

                        <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                    <input
                                        type="search"
                                        className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-black font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="button-addon3"


                                    />
                                    <button


                                        className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                                        type="submit"
                                        id="button-addon3"
                                        data-te-ripple-init>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>


                    </form>


                  



                    <div
                        className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "

                    >

                        {category.map((cat, index) => (
                            <div
                                key={index}
                            >
                                <ProductBar
                                    all={cat}
                                    allLink={`/seller/Products/category/${cat}`}
                                />
                            </div>
                        ))}

                    </div>







                    <div
                        className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                    >

                        {data?.offers.map((offer: {
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
                                            onClick={() => router.push(`Products/Edit/${offer._id}`)}
                                            className="btn bg-black float-right "
                                        > EDIT
                                        </button>


                                    </div>

                                </div>




                            </div>
                        ))}
                    </div>

                    <div
                        className="mt-5 space-x-5 text-black flex justify-center "
                    >



                        <button
                            disabled={page === 1}
                            onClick={handlePrevious}
                            className="bg-black rounded-lg text-white p-3"
                        >
                            Previous
                        </button>
                        <div>
                            Page: {page}
                        </div>



                        <button
                            disabled={page === pageCount}
                            onClick={handleNext}
                            className="bg-black rounded-lg text-white p-3"
                        >
                            Next
                        </button>
                    </div>


                </>
            </CatLayout>
        )
    }




}

export default Offerings;