import Link from "next/link";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";
import NavButton from "../../../components/shared/NavButton";










export default function Index() {



    return (
        <CredLayout>
            <div
                className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <Header
                    title="TRANSACTIONS"
                />


                <NavButton
                    uLink="/creder/Transactions/transHistory"
                    title="Transactions History"
                />



                <NavButton
                    uLink="/creder/Transactions/WithDraw"
                    title="Withdraw"
                />



            </div>
        </CredLayout>
    )
}