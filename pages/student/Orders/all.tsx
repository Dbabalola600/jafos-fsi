import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";






export default function index() {
    return (
        <StuLayout>
            <>
                <Header
                    title="ALL Orders"
                    desc="Show ALL ORDERS"
                />


                <div>
                    click to go back to last order
                </div>

                

            </>
        </StuLayout>
    )



}