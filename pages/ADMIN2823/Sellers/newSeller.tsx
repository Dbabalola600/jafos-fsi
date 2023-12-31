import { FormEventHandler, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import TextInput from "../../../components/shared/TextInput";
import Header from "../../../components/shared/Header";








export default function NewSeller() {
    const router = useRouter()

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)


    const Newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            firstname: HTMLInputElement
        }
        const form = e.currentTarget.elements as any

        const body = {
            store_desc: form.item(0).value,
          
            storename: form.item(1).value,

            password: form.item(2).value,
        }



        const response = await fetch("/api/admin/seller/createSeller", { method: "POST", body: JSON.stringify(body), headers: { role: "student" } })
            .then(res => {

                if (res.status == 200) {
                    router.push("/ADMIN2823/Sellers")
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
                        Newadd
                    }
                    autoComplete={"off"}
                    className="w-full py-20 space-y-16  text-black text-base md:text-xl"
                >

                    <Header
                        title="Create Account"
                        desc="Please provide necessary details for  Seller account creation" />

                    <div className="grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:gap-y-28">

                        {/* store description */}
                        <div className="col-span-12  md:col-span-6 ">
                            <TextInput

                                placeholder="Store Description"

                                type="text"
                                name="store desciption"
                                id="storedescription"
                            />
                        </div>

                        

                        {/* Storename */}
                        <div className="col-span-12  md:col-span-6 ">
                            <TextInput

                                placeholder="Storename"

                                type="text"
                                name="Storename"

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