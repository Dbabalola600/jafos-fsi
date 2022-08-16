import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import TextInput from "../../components/shared/TextInput";

import CatLayout from "./Layout/CatLayout";


function newOffer() {
    return (
        <CatLayout>
            <form
                autoSave={"off"}
                // onSubmit={
                //     newadd
                // }
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


                    <div className="col-span-12  md:col-span-6 ">
                        <TextInput
                            // errorMessage={errors.firstName?.message}
                            placeholder="Category"
                            // registerName="fistName"
                            // register={register("firstName")}
                            type="text"

                            name="category"
                            id="category"

                        />
                    </div>


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
                    {/* <button className="btn1 w-full" type="submit"
                 disabled={isButtonLoading}>
              {isButtonLoading ? "Loading..." : "Proceed"}
          </button> */}
                    <button className="w-full btn-primary btn "
                        type="submit">
                        {/* {isLoading ? "Loading..." : "Proceed"} */}
Proceed
                    </button>

                    <h6 className="text-center md:text-xl w-full">
                        already have an account?{" "}
                        <span className=" hover:underline">
                            <Link href="/student/">Login</Link>
                        </span>
                    </h6>
                </div>

            </form>
        </CatLayout>
    )
}

export default newOffer;