import Header from "../../../components/shared/Header";
import CatLayout from "../Layout/CatLayout";






export default function index() {
    return (
        <CatLayout>
            <>
                <Header
                    title="show order history"
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