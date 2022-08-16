import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";


function Cart (){
    return (
        <StuLayout>
            <>
            
            <div 
            className=" bg-black md:w-60">
            <Header
            title="CHECKOUT"
            />
            </div>



            </>
        </StuLayout>
    )
}

export default Cart;