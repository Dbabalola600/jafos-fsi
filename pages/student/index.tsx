import DefaultLayout from "../../components/layouts/DefaultLayout";
import TextInput from "../../components/shared/TextInput";
import Header from "../../components/shared/Header";
import Link from "next/link";



function Login() {
    return (
        <>
            <DefaultLayout>
                <form
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"

                >


                   
                    <Header
                    title="LOGIN"
                    desc=" please provide necessary details for sign in"
                    />



                   



                    <div className="mx-auto  w-full ">
                            <TextInput
                                placeholder=" UserName"
                                name="UserName"
                                type='text'

                            />
                        </div>


                        <div className="mx-auto w-full ">
                            <TextInput
                                placeholder=" Password"
                                name="Password"
                                type='password'
                            />
                        </div>




                    <div className=" w-full  space-y-6">
                        {/* <button className="btn1 w-full" type="submit" disabled={isButtonLoading}>
              {isButtonLoading ? "Loading..." : "Proceed"}
          </button> */}
                        <button className="w-full btn-primary btn ">
                            SIGN IN
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