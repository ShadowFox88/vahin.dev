import React from "react";

import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

export default function Page({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    );
}