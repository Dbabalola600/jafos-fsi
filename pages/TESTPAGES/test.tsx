
import Header from "../../components/shared/Header";

import StuLayout from "../student/Layout/StuLayout";
import Test from '../../model/testModel';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { Key, useEffect, useState } from "react";
import Link from "next/link";
import CusModal from "../../components/shared/modal";
import { useRouter } from "next/router";


type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}

function test() {
    const router = useRouter()
    const [sellers, SetSellers] = useState<Sellers[]>([])

    const showinfo = async () => {
        const SellerResponse = await fetch("/api/test/testfetch", { method: "GET" })
            .then(res => res.json()) as Sellers[]

        SetSellers(SellerResponse)


    }


    function test() {
        router.push("/")
    }


    useEffect(() => {
        showinfo()

    }, [])


    return (

        <>

            <div
                className=" bg-black md:w-60">
                <Header
                    title="test displaying users"
                />



            </div>



            {sellers.map((seller: { _id: string | null | undefined; storename: string; }) =>
                <div
                    key={seller._id}
                >
                    {/* <Link
                        href={`/stores/${seller.storename}`}
                    > */}
                    <a>
                        <Header
                            title={seller.storename}
                        />
                    </a>

                    {/* </Link> */}

                </div>
            )}

            <CusModal
                mainButtonTitle="main button"
                modalInfo=" information goes in here"
                smButtonTitle="click this"
                clickButton={()=> {test()}}
            />

        </>

    )
}




export default test;