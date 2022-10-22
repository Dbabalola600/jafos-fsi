import { FormEventHandler, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import TextInput from "../../../components/shared/TextInput";
import Header from "../../../components/shared/Header";


export default function newCreder() {
    const router = useRouter()

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        // const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
        //     firstname: HTMLInputElement
        // }

        const form = e.currentTarget.elements as any

        const body = {
            firstname: form.item(0).value,

            lastname: form.item(1).value,
            creder_no: form.item(2).value,

            password: form.item(3).value,
        }



        const response = await fetch("/api/admin/creder/newCreder", { method: "POST", body: JSON.stringify(body), headers: { role: "student" } })
            .then(res => {

                if (res.status == 200) {
                    router.push("/ADMIN2823/Creder")
                }
            }).catch(err => {
                console.log(err)
            })

        setLoading(false)

    }


    return (
        <AdminLayout>
            <>



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
                        desc=" please provide necessary details for  Seller account creation" />

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

                            />
                        </div>




                          {/* cred number */}
                          <div className="col-span-12  md:col-span-6 ">
                            <TextInput

                                placeholder="Creder Number"

                                type="text"
                                name="creder number"

                            />
                        </div>





                        {/* password */}
                        <div className="col-span-12  md:col-span-6 ">
                            <TextInput

                                placeholder="Password"

                                type="password"
                                name="password"
                                id="password"

                            />
                        </div>

                    </div>





                    <div className=" w-full  space-y-6">

                        <button className="w-full btn-primary btn "
                            type="submit">
                            {isLoading ? "Loading..." : "Proceed"}

                        </button>

                      
                    </div>



                   

                </form>
            </>
        </AdminLayout>
    )
}