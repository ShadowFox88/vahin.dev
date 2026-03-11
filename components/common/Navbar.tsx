"use client"

export default function Navbar() {
    const pages = ["Home", "Blog", "Contact"];

    return (
        <header className="inline-block p-10 font-[Google_Sans_Code]">
            <ul className="list-none m-0 block">
                {Object.keys(pages).map(index=><li key={pages[Number(index)]} className="block float-left p-5 text-cyan-700 hover:bg-navbar-link-background">{pages[Number(index)]}</li>)}
            </ul>
        </header>
    )
}