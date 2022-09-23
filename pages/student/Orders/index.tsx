import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";






export default function index(){
return (
    <StuLayout>
        <>
        <Header
        title="Orders"
        desc="Show recent orders i.e pending and what not"
        />
        

<div>
    click to show all orders i.e from the orders api
</div>

        </>
    </StuLayout>
)



}