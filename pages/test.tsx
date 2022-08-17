
import Header from "../components/shared/Header";

import StuLayout from "./student/Layout/StuLayout";
import Test from '../model/testModel';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { Key } from "react";


type Test ={
    _id : string;
    name: string
}

function DashBoard({ tests }: InferGetServerSidePropsType<typeof getServerSideProps>) {

   
    return (
        <StuLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <Header
                        title="test displaying users"
                    />

                    {tests.map((test: { _id: Key | null | undefined; name: string; }) =>
                    (
                        <div
                            key={test._id}
                        >
                            <Header
                                title={test.name}
                            />
                        </div>
                    )
                    )}


                </div>



            </>
        </StuLayout>
    )
}

export async function getServerSideProps(){
    const res = await fetch("http://localhost:3000/api/test/testfetch", {method: "GET", body: JSON.stringify(Test)}) 
   const tests = await Test.find();
  
    return {
        props: {
          tests: JSON.parse(JSON.stringify(tests)),
        },
      };
}


export default DashBoard;