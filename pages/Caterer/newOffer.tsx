import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

import Header from "../../components/shared/Header";
import TextInput from "../../components/shared/TextInput";

import CatLayout from "./Layout/CatLayout";


function newOffer() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements 

        const form = e.currentTarget.elements as any


        const body = {
            title: form.item(0).value,
            price: form.item(1).value,
            category: form.item(2).value,
            description: form.item(3).value,

        }

        const response = await fetch("/api/test/newproduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    router.push("/Caterer/Offerings")
                }
            }).catch(err => {
                console.log(err)
            })

        setLoading(false)
    }


    return (
        <CatLayout>
            <form
                autoSave={"off"}
                onSubmit={
                    newadd
                }
                autoComplete={"off"}
                className="w-full py-20 space-y-16  text-black text-base md:text-xl"
            >

                <Header
                    title="ADD PRODUCT"
                    desc=" please provide necessary details for account creation" />

                <div className="grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:gap-y-28">

                    {/* title */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Title"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="text"
                            name="title"
                            id="title"
                        />
                    </div>






                    {/* price */}
                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Price"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="number"

                            name="price"
                            id="price"

                        />
                    </div>

                    {/* category */}

                    <div className="col-span-12  md:col-span-6 ">
                        <div className="form-control">
                            <div className="input-group">
                                <select className="select select-bordered">
                                    <option disabled selected>Pick category</option>
                                    <option>Food</option>
                                    <option>Drinks</option>
                                </select>

                            </div>
                        </div>
                    </div>




                    {/* description */}

                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Description"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="text"

                            name="description"
                            id="description"

                        />
                    </div>




                </div>







                <div className=" w-full  space-y-6">

                    <button className="w-full btn-primary btn "
                        type="submit">
                        {isLoading ? "Loading..." : "ADD NEW"}

                    </button>

                </div>

            </form>
        </CatLayout>
    )
}

export default newOffer;