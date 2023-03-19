import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";




export default function Hist() {

    const executives = [
        { name: "Benjamin Ajibade", position: "President", link: "https://example.com" },
        { name: "Olatubusun John", position: "Vice-President", link: "https://example.com" },
        { name: "Babalola Damisi", position: "Financial Secretary", link: "https://example.com" },
        { name: "Ajayi Israel", position: "General Secretary", link: "https://example.com" },
        { name: "Merit Mohammed", position: "Assistant General Secretary", link: "https://example.com" },
        { name: "Chineye ", position: "Librarian", link: "https://example.com" },
        { name: "??", position: "Assistant Librarian", link: "https://example.com" },
        { name: "Kuboye Katete", position: "Public Relations Officer", link: "https://example.com" },
        { name: "Julo", position: "Director of Socials", link: "https://example.com" },
        { name: "Kemi Sarah", position: "Director of Sports", link: "https://example.com" }
    ];
    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>
                <div
                >



                    <div
                        className="indicator"
                    >
                        <span
                            className="indicator-item badge badge-primary"
                        >
                            99+
                        </span>
                        <button>
                            inbox
                        </button>
                    </div>

                </div>
            </>
        </DefaultLayout>
    )
}