
import Header from "../../components/shared/Header";


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


    return (

        <>

            <div
                className=" bg-black md:w-60">
                <Header
                    title="test displaying users"
                />



            </div>


            <div className="bg-primary rounded-lg btn-block mt-10 mb-5 pt-5 text-white ">

                <div
                    className="relative"
                >
                    <div
                        className="rounded-xl text-center text-sm float-right px-5 mx-2  bg-black text-white"
                    >
                        status
                    </div>

                    <div
                        className=" mx-5"
                    >
                        Seller
                    </div>




                    <div
                        className=" mx-5"
                    >
                        description
                    </div>
                </div>

            </div>


            <div
            onClick ={()=> router.back()}
            className="text-red-500"
            >

                Goback
            </div>




            <CusModal
                mainButtonTitle="main button"
                modalInfo=" information goes in here"
                smButtonTitle="click this"
                clickButton={() => { }}
            />

        </>

    )
}




export default test;