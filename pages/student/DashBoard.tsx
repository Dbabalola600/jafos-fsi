import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import LoggedLayout from "../../components/layouts/LoggedLayout";




function DashBoard (){
    return (
        <LoggedLayout>
            <>
            <Header
            title="WELCOME USER"
            />
            </>
        </LoggedLayout>
    )
}

export default DashBoard;