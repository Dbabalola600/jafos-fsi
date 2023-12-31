import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import TextInput from "../../components/shared/TextInput";


import { FormEventHandler, useEffect, useState } from "react";
import newStudent from "../api/student/createAccount";
import addStudent from "../api/student/createAccount";
import { useRouter } from "next/router";
import ErrMess from "../../components/shared/ErrMess";
import GoodMess from "../../components/shared/GoodMess";





function CreateAccount() {
    const router = useRouter()

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })

    const [showtoast3, settoast3] = useState({ message: "", show: false })

    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showtoast2.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])

    useEffect(() => {
        if (showtoast3.show) {
            setTimeout(() => {
                settoast3({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast3.show])



    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])




    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            firstname: HTMLInputElement
        }
        const form = e.currentTarget.elements as any

        const body = {
            firstname: form.item(0).value,
            lastname: form.item(1).value,
            email: form.item(2).value,
            matricno: form.item(3).value,
            password: form.item(4).value,
        }


        const FlutterAcc = await fetch("/api/FLUTTER/virtual-account/createAccount")
            .then(async res => {
                if (res.status === 200) {
                    const response = await fetch("/api/student/createAccount", { method: "POST", body: JSON.stringify(body), headers: { role: "student" } })
                        .then(res => {

                            if (res.status === 200) {

                                setgoodtoast({ message: "", show: true })
                                router.push("/")
                            }
                            if (res.status === 256) {
                                settoast2({ message: "", show: true })
                            }
                            else {
                                settoast({ message: " message", show: true })
                            }

                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    settoast3({ message: " message", show: true })
                }
            })


        setLoading(false)

    }


    return (
        <DefaultLayout>
            <form
                autoSave={"off"}
                onSubmit={
                    newadd
                }
                autoComplete={"off"}
                className="w-full py-20 space-y-16  text-black text-base md:text-xl"
            >

                <Header
                    title="Student Account Creation"
                    desc="please provide necessary details to create a student account" />

                <div className="grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:gap-y-28">

                    {/* first name */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput

                            placeholder="First Name"

                            type="text"
                            name="firstname"
                            id="firstname"
                        />
                    </div>

                    {/* lastname */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput

                            placeholder="Last Name"

                            type="text"
                            name="lastname"
                            id="lastname"
                        />
                    </div>

                    {/* email */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput

                            placeholder="Email"

                            type="email"
                            name="email"
                            id="email"
                        />
                    </div>


                    {/* matricNumber */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput

                            placeholder="Matric Number"

                            type="text"

                            name="matricno"
                            id="matricno"

                        />
                    </div>


                    {/* password */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput

                            placeholder="Password"

                            type="password"
                            name="Password"


                        />
                    </div>

                </div>





                {showtoast.show && <ErrMess title="invalid credentials specified" />}
                {showtoast2.show && <ErrMess title="Already exits, please login" />}
                {showgoodtoast.show && <GoodMess title="created successfuly" />}
                {showtoast3.show && <ErrMess title="NETWORK ERROR" />}

                <div className=" w-full  space-y-6">

                    <button className="w-full btn-primary btn "
                        type="submit">
                        {isLoading ? "Loading..." : "Proceed"}

                    </button>

                    <h6 className="text-center md:text-xl w-full">
                        Already have an Account?{" "}
                        <span className=" hover:underline">
                            <Link href="/">Login</Link>
                        </span>
                    </h6>
                </div>

            </form>
        </DefaultLayout>
    )
}





export default CreateAccount


