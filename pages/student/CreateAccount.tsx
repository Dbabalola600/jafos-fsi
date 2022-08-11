import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import TextInput from "../../components/shared/TextInput";









function CreateAccount() {
    return (
      <DefaultLayout>
          <form
        autoSave={"off"}
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
                        name="First Name"
                        id=""
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
                        name="Last Name"
                        id=""
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
                        name="Email"
                        id=""
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

                        name="Matric Number"
                        
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







            <div className=" w-full  space-y-6">
                {/* <button className="btn1 w-full" type="submit" disabled={isButtonLoading}>
              {isButtonLoading ? "Loading..." : "Proceed"}
          </button> */}
                <button className="w-full btn-primary btn ">
                    SIGN IN
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