import { hasCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "../../../components/layouts/Footer";
import {IoMdArrowRoundBack} from "react-icons/io"




export default function StuLayout({ children }: { children?: JSX.Element }) {


    const router = useRouter()


    // function checkUser() {
    //     const userCheck = hasCookie("Normuser")

    //     console.log(userCheck)

    //     if (userCheck == false) {
    //         router.push("/")
    //     }
    // }



    // useEffect(() => {
    //     checkUser()
    // }, [])

    return (
        <div>
            <div className="bg-gray-200 md:space-y-20  min-h-screen">
                <NavBar />
                <div className="bg-white max-w-5xl mx-auto py-20  px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
                   <IoMdArrowRoundBack
                   size=" 40"
                   color="black"
                   onClick={()=> history.back()}
                   />
                   
                   
                    <main>
                        <Head>
                            <title>Jafos</title>
                            <meta name="description" content="Generated by create next app" />
                            <link rel="icon" href="/logo.ico" />

                        </Head>

                        {children}


                    </main>

                </div>

            </div>

            <Footer />
        </div>
    )
}

