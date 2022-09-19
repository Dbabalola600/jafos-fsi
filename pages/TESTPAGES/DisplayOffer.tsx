import { InferGetServerSidePropsType } from "next"
import { Key } from "react"
import Header from "../../components/shared/Header"

type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


function DisplayOffer({ offers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(offers)

    return (
        <>

            <Header
                title="test to display offerings per different sellers"
            />
            {offers.map((offer: {
                description: string
                price: number
                title: string;

                _id: Key | null | undefined

            }) => (
                <div
                    key={offer._id}
                >
                    <div className="text-red-500">
                        {offer.title} {" "}
                        {offer.price}{" "}
                        {offer.description}
                    </div>
                </div>
            ))}


        </>
    )
}

export default DisplayOffer


export async function getServerSideProps() {

    const res = await fetch("http://localhost:3000/api/student/fetchOffer", { method: "GET" }).then(res => res.json()) as Offers[];


    return {
        props: {
            offers: res
        }
    }



}