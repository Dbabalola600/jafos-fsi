import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";



export default function index (){
    return(
        <StuLayout>
            <>
            <Header
            title="Update Password"
            />
            </>
        </StuLayout>
    )
}

