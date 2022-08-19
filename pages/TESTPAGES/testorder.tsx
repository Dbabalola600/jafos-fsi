
import Header from "../../components/shared/Header";

import StuLayout from "../student/Layout/StuLayout";
import Test from '../../model/testModel';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { Key } from "react";


type Test = {
    _id: string | Key;
    name: string
    order: {
        title: string;
        _id: string;
        category: string;
        price: number;
    }

}

type TestOrder = {
    title: string;
    _id: string;
    category: string;
    price: number;
    user: string;
    userObj: {
        name:string
    }
}

function DashBoard({ tests, orders }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(orders)

    return (
        <StuLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <Header
                        title="test getting orders"
                    />


                </div>



               



                {orders.map((order: {
                    _doc:any;
                    _id: Key | null | undefined;
                    title:string;
                    user: string;
                    userObj: {
                        name:string
                    };
                    Test: {
                        name: string
                    }

                }) =>
                (
                    <div className="text-red-500 bg-primary text-lg"
                        key={order._id}>
                        this order
                        <div className="text-yellow-500"

                        >
                            {order._doc.title}, {order._doc.price}
                        </div>

                        <div className="text-black">
                            by  {order?.userObj?.name}
                        </div>

                    </div>
                )
                )}



                {/* {tests.map((test: {
                    _id: Key | null | undefined;
                    name: string;
                    order: {
                        title: string;
                        _id: Key | null | undefined

                    }

                }) =>
                (
                    <div className="text-red-500 bg-primary text-lg"
                        key={test._id}>
                        this order
                        <div className="text-yellow-500"

                        >
                            {test.order?.title}
                        </div>

                        <div className="text-black">
                            by  {test.name}
                        </div>

                    </div>
                )
                )} */}

            </>
        </StuLayout>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/test/testfetch", { method: "GET" }).then(res => res.json())
    //    const tests = await Test.find();
    const orderres = await fetch("http://localhost:3000/api/test/testfetchorders", { method: "GET" }).then(orderres => orderres.json())

    

    return {
        props: {
            tests: res.tests,
            orders: orderres.orders
        },
    };
}


export default DashBoard;