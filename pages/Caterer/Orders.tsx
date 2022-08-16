

import CatLayout from "./Layout/CatLayout";
import Header from "../../components/shared/Header";



function Orders() {
    return (
        <CatLayout>
            <>
                <Header
                    title="ORDERS"
                />

                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div className="collapse-content">
                        <p>tabindex="0" attriute is necessary to make the div focusable</p>
                    </div>
                </div>




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