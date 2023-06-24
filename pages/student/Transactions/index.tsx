import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StuLayout from "../Layout/StuLayout";



export default function Index() {
    return (
        <StuLayout>
            <>
                <Header
                    title="TRANSACTIONS"
                />




                <div
                    className="w-full py-20  text-black text-base md:text-xl"

                >

                    <NavButton
                        uLink="/student/Transactions/transHistory"
                        title="Transactions History"
                    />

                    <NavButton
                        uLink="/student/Transactions/creditAccount"
                        title="Credit Account"
                    />



                    <NavButton
                        uLink="/student/Transactions/TransStore"
                        title=" Transfer To Store"
                    />

                    <NavButton
                        uLink="/student/Transactions/TransUser"
                        title=" Transfer To Other Studnets"
                    />


{/* 
                    <NavButton
                        uLink="/student/Transactions/WithDraw"
                        title="Withdraw"
                    /> */}





                </div>
            </>
        </StuLayout>
    )
}

