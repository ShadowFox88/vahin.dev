"use client"

export default function Navbar() {
    const pages = ["Home", "Blog", "Contact"];

    return (
        <header className="inline-block">
            <ul className="list-none">
                {pages.map(_=><li key={_} className="block float-left mr-10 p-20 bg-white">{_}</li>)}
            </ul>
        </header>
    )
}