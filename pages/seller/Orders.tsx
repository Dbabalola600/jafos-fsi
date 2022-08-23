

import CatLayout from "./Layout/CatLayout";
import Header from "../../components/shared/Header";



function Orders() {
    return (
        <CatLayout>
            <>
                <Header
                    title="ORDERS"
                />





                <div className="collapse">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-primaryColour text-white ">
                        Click me to show/hide content
                    </div>
                    <div className="collapse-content bg-primaryColour text-white ">
                        <p>hell</p>
                    </div>
                </div>
            </>
        </CatLayout>
    )
}

export default Orders;