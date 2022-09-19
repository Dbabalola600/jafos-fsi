import Header from "../../../components/shared/Header"
import StuLayout from "../../student/Layout/StuLayout"




function Alpha() {
    return (

        <StuLayout>
            <>
                <Header
                    title=" Delta"
                />

                <div
                    className="text-red-500"
                >
                    display offerings 
                </div>
            </>
        </StuLayout>
    )
}


export default Alpha