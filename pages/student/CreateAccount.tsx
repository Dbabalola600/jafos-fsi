import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import TextInput from "../../components/shared/TextInput";


import { FormEventHandler, useEffect, useState } from "react";
import newStudent from "../api/student/createAccount";
import addStudent from "../api/student/createAccount";
import { useRouter } from "next/router";
import ErrMess from "../../components/shared/ErrMess";





function CreateAccount() {
    const router = useRouter()

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


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



        const response = await fetch("/api/student/createAccount", { method: "POST", body: JSON.stringify(body), headers:{role:"student"} })
            .then(res => {

                if (res.status === 200) {
                    router.push("/student/")
                }
               else {
                    settoast({ message: " message", show: true })
                }

            }).catch(err => {
                console.log(err)
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
                    title="Create Account"
                    desc=" please provide necessary details for account creation" />

                <div className="grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:gap-y-28">

                    {/* first name */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="First Name"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="text"
                            name="firstname"
                            id="firstname"
                        />
                    </div>

                    {/* lastname */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Last Name"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="text"
                            name="lastname"
                            id="lastname"
                        />
                    </div>

                    {/* email */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Email"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="email"
                            name="email"
                            id="email"
                        />
                    </div>


                    {/* matricNumber */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Matric Number"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="number"

                            name="matricno"
                            id="matricno"

                        />
                    </div>


                    {/* password */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Password"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="password"
                            name="Password"
                          

                        />
                    </div>

                </div>





                {showtoast.show && <ErrMess title="invalid credentials specified" />}
                   

                <div className=" w-full  space-y-6">
                  
                    <button className="w-full btn-primary btn "
                        type="submit">
                        {isLoading ? "Loading..." : "Proceed"}

                    </button>

                    <h6 className="text-center md:text-xl w-full">
                        already have an account?{" "}
                        <span className=" hover:underline">
                            <Link href="/student/">Login</Link>
                        </span>
                    </h6>
                </div>

            </form>
        </DefaultLayout>
    )
}





export default CreateAccount


