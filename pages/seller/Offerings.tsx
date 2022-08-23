import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";


function Offerings() {
    return (
        <CatLayout>
            <>



                <div className="grid grid-cols-2 space-x-10">

                    <div
                        className=" bg-black  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                            VIEW OFFERINGS
                        </div>
                    </div>

                    <div className='  mx-auto'>
                        <Link
                            href="/seller/newOffer">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Offering
                            </button>
                        </Link>
                    </div>


                </div>

            </>
        </CatLayout>
    )
}

export default Offerings;