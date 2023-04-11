import Link from "next/link";
import Header from "../../../components/shared/Header";
import CredLayout from "../Layout/credLayout";
import NavButton from "../../../components/shared/NavButton";










export default function WithDraw() {

    return (
        <CredLayout>
            <div
                className="w-full py-20 space-y-10  text-black text-base md:text-xl"

            >
                <Header
                    title="WITHDRAW"
                />

                <NavButton
                    uLink="/creder/Transactions/Staff"
                    title="Staff"
                />

                <NavButton
                    uLink="/creder/Transactions/Student"
                    title="Student"
                />





            </div>
        </CredLayout>
    )
}