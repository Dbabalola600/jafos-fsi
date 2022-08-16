import Head from "next/head";
import Link from "next/link";
import EmpNav from "./EmpNav";
function DefaultLayout({ children }: { children?: JSX.Element }) {
    return (

        <div className="bg-primaryColour md:space-y-20  min-h-screen">
            <EmpNav/>
            <div className="bg-white max-w-5xl mx-auto py-5 px-10 md:py-10 md:px-20 min-h-screen md:min-h-0">
                <main>
                    <Head>
                        <title>Jafos</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/logo.ico" />
                    </Head>

                    {children}
                </main>

            </div>
        </div>
    )
}

export default DefaultLayout;