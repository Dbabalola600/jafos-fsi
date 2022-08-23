import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";




function DashBoard (){
    return (
        <StuLayout>
            <>

            <div 
            className=" bg-black md:w-60">
            <Header
            title="WELCOME USER"
            desc="this is the student dahboard"
            />
            </div>



            </>
        </StuLayout>
    )
}

export default DashBoard;