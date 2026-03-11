import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <div className="p-10 font-[Google_Sans_Code]">{children}</div>
  );
}