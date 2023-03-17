import Link from "next/link";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StaffLay from "../Layout/StaffLay";




export default function Index() {
    return (
        <StaffLay>
            <>
                <Header
                    title="TRANSACTIONS"
                />

                <div
                    className="w-full py-20  text-black text-base md:text-xl"

                >

                    <NavButton
                        uLink="/staff/Transactions/transHistory"
                        title="Transactions History"
                    />

                    <NavButton
                        uLink="/staff/Transactions/creditAccount"
                        title="Credit Account"
                    />



                    <NavButton
                        uLink="/staff/Transactions/TransStore"
                        title=" Transfer To Store"
                    />

                    <NavButton
                        uLink="/staff/Transactions/TransUser"
                        title=" Transfer To Other Staff"
                    />



                    <NavButton
                        uLink="/staff/Transactions/WithDraw"
                        title="Withdraw"
                    />





                </div>



            </>
        </StaffLay>
    )
}