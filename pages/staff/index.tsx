import DefaultLayout from "../../components/layouts/DefaultLayout";
import TextInput from "../../components/shared/TextInput";
import Header from "../../components/shared/Header";
import Link from "next/link";

import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrMess from "../../components/shared/ErrMess";
import GoodMess from "../../components/shared/GoodMess"

import { getCookie, setCookie, hasCookie, getCookies } from 'cookies-next'







export default function Login(){

    const router = useRouter()

    const [isLoading, setLoading] = useState(false)

    const [showtoast, settoast] = useState({ message: "", show: false })

    const [showgoodtoast, setgoodtoast ] = useState({  message: "", show:false }) 

    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])

    const login: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        setLoading(true)

        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            matricno: HTMLInputElement
        }
        const form = e.currentTarget.elements as any

        const body = {
            staffid: form.item(0).value,
            password: form.item(1).value,
        }



        const response = await fetch("/api/staff/login", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })
                    router.push("/staff/DashBoard")
                    return res.json()

                }
                if (res.status == 401) {
                    settoast({ message: " message", show: true })
                    
                }
            }).then((data) => {
                // window.localStorage.setItem("token", data.token);
                console.log(getCookie("Staffuser"))



            }).catch(err => {
                console.log(err)
            })

        setLoading(false)

    }

    return(
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



                    {showtoast.show && <ErrMess title="invalid id or password" />}
                    {showgoodtoast.show && <GoodMess title="login successful" />}








                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Staff Id"
                            name="Staff Id"
                            type='text'

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

                     
                    </div>




                </form>
            </DefaultLayout>

        
        </>
    )
}