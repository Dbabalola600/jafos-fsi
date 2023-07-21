import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import CatLayout from "../Layout/CatLayout";











export default function Index() {
    return (
        <CatLayout>
            <>
                <Header
                    title="TRANSACTIONS"
                />




                <div
                    className="w-full py-20  text-black text-base md:text-xl"

                >

                    <NavButton
                        uLink="/seller/Transactions/transHistory"
                        title="Transactions History"
                    />

                  




                    <NavButton
                        uLink="/seller/Transactions/Payment/"
                        title="Recieve Payment"
                    />



                    <NavButton
                        uLink="/seller/Transactions/WithDraw"
                        title="Withdraw"
                    />





                </div>
            </>
        </CatLayout>
    )
}
