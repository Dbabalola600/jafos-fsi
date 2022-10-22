import Link from "next/link";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";













export default function index() {



    return (
        <CredLayout>
            <div
                 className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <Header
                    title="Tokens"
                />

                <div className='  mx-auto'>
                    <Link
                        href="/creder/Tokens/newToken">
                        <button className="btn btn-lg btn-primary btn-block">
                            New Token
                        </button>
                    </Link>
                </div>


                <div className='  mx-auto'>
                    <Link
                        href="/creder/Tokens/available">
                        <button className="btn btn-lg btn-primary btn-block">
                            View Available Tokens
                        </button>
                    </Link>
                </div>


            </div>
        </CredLayout>
    )
}