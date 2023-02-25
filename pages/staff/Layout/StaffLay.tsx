import { hasCookie } from "cookies-next";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "./NavBar";

export default function StaffLay({ children }: { children?: JSX.Element }) {


    const router = useRouter()


    function checkUser() {
        const userCheck = hasCookie("Staffuser")

        console.log(userCheck)

        if (userCheck == false) {
            router.push("/")
        }
    }



    useEffect(() => {
        checkUser()
    }, [])

    return (

        <div className="bg-primaryColour md:space-y-20  min-h-screen">
            <NavBar />
            <div className="bg-white max-w-5xl mx-auto py-20  px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
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
    )
}

