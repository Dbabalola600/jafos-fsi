import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Key } from "react";
import Header from "../../components/shared/Header";




type Seller = {
    _id: string;
    storename: string;

}

type storeProps = {
    sellers: Seller[]
}


function AvailableStores({ sellers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            {sellers.map((seller: { _id: Key | null | undefined; storename: string; }) =>
                <div
                    key={seller._id}
                >
                    <Link
                        href={`/stores/${seller.storename}`}
                    >
                        <a>
                        <Header
                            title={seller.storename}
                        />
                        </a>
                       
                    </Link>

                </div>
            )}

        </>
    )
}


export default AvailableStores



export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/student/fetchSeller", { method: "GET" }).then(res => res.json())

    return {
        props: {
            sellers: res.sellers
        }
    }

}