import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";



export default function index() {
    return (
        <StuLayout>
            <>
                <Header
                    title="TRANSACS PAGE"
                />




                <div
                    className="w-full py-20 space-y-10  text-black text-base md:text-xl"

                >
                   
                    <div className='  mx-auto'>
                        <Link
                            href="/student/Transactions/creditAccount">
                            <button className="btn btn-lg btn-primary btn-block">
                                Credit Account
                            </button>
                        </Link>
                    </div>




                    <div className='  mx-auto'>
                        <Link
                            href="/student/Transactions/TransStore">
                            <button className="btn btn-lg btn-primary btn-block">
                                Transfer To Store
                            </button>
                        </Link>
                    </div>

                    

                    <div className='  mx-auto'>
                        <Link
                            href="/student/Transactions/TransUser">
                            <button className="btn btn-lg btn-primary btn-block">
                               Transfer To Other Users
                            </button>
                        </Link>
                    </div>


                    <div className='mx-auto'>
                        <Link
                            href="/student/Transactions/Withdraw">
                            <button className="btn btn-lg btn-primary btn-block">
                              Withdraw
                            </button>
                        </Link>
                    </div>
                    

                </div>
            </>
        </StuLayout>
    )
}

