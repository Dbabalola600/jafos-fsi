import DefaultLayout from "../../components/layouts/DefaultLayout";
import TextInput from "../../components/shared/TextInput";
import Header from "../../components/shared/Header";
import Link from "next/link";

import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loginerro from "../../components/shared/loginerro";

import login from "../api/login"
import {getCookie, setCookie, hasCookie, getCookies} from 'cookies-next'







function Login(res: any,req: any) {





    const router = useRouter()

    const [isLoading, setLoading] = useState(false)

    const [showtoast, settoast] = useState({ message: "", show: false })


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    const login: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        setLoading(true)

        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            matricno: HTMLInputElement
        }
        const form = e.currentTarget.elements as any

        const body = {
            matricno: form.item(0).value,
            password: form.item(1).value,
        }



        const response = await fetch("/api/login", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    return res.json()

                }
                if (res.status == 401) {
                    settoast({ message: " message", show: true })
                }
            }).then((token) => {
                // window.localStorage.setItem("token", data.token);
               console.log( getCookie("token"))
               
                
                router.push("/student/DashBoard")
            }).catch(err => {
                console.log(err)
            })

        setLoading(false)

    }

    return (
        <>
            <DefaultLayout>
                <form
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                    onSubmit={
                        login
                    }
                >



                    <Header
                        title="LOGIN"
                        desc=" please provide necessary details for sign in"
                    />



                    {showtoast.show && <Loginerro title="invalid matric no or password" />}









                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder=" Matric Number"
                            name="matricno"
                            type='number'

                        />
                    </div>


                    <div className="mx-auto w-full ">
                        <TextInput
                            placeholder="Password"
                            name="password"
                            type='password'
                        />
                    </div>




                    <div className=" w-full  space-y-6">

                        <button className="w-full btn-primary btn "
                            type="submit">
                            {isLoading ? "Loading..." : "SIGN IN"}

                        </button>

                        <h6 className="text-center md:text-xl w-full">
                            Don't have an account?{" "}
                            <span className=" hover:underline">
                                <Link href="student/CreateAccount">Create account</Link>
                            </span>
                        </h6>
                    </div>




                </form>
            </DefaultLayout>

        </>
    )
}





export default Login;