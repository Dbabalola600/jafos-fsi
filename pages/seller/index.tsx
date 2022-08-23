import DefaultLayout from "../../components/layouts/DefaultLayout";
import TextInput from "../../components/shared/TextInput";
import Header from "../../components/shared/Header";
import Link from "next/link";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loginerro from "../../components/shared/loginerro";


function Login() {


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
            storename: HTMLInputElement
        }
        const form = e.currentTarget.elements as any

        const body = {
            storename: form.item(0).value,
            password: form.item(1).value,
        }




        const response = await fetch("/api/loginSell", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    return res.json()

                }
                if (res.status == 401) {
                    settoast({ message: " message", show: true })
                }
            }).then((data) => {
                window.localStorage.setItem("token", data.token);
                router.push("/seller/DashBoard")
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

                    {showtoast.show && <Loginerro title="invalid login credentials" />}






                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder=" Store Name"
                            name="storename"
                            type='text'

                        />
                    </div>


                    <div className="mx-auto w-full ">
                        <TextInput
                            placeholder=" Password"
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


export default Login;