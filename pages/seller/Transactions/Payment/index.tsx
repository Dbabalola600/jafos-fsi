import Header from "../../../../components/shared/Header";
import NavButton from "../../../../components/shared/NavButton";
import CatLayout from "../../Layout/CatLayout";











export default function WithDraw() {
    return (
        <CatLayout>
            <>
                <Header
                    title='RECIEVE PAYMENT'
                />




                <NavButton
                    title=" From student"
                    uLink="Payment/Student"
                />

                <NavButton
                    title=" From Staff"
                    uLink="Payment/Staff"
                />



            </>
        </CatLayout>
    )
}
