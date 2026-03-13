import Image from "next/image"

type Props = {
    icon: string,
    name: string,
    description: string,
}

export default function LinkCard({ icon, name, description }: Props) {

    return (
        <div 
        className="bg-zinc-100 dark:bg-zinc-800 p-4
                    cursor-pointer border border-zinc-300 dark:border-zinc-700 
                    active:opacity-75 duration-100 flex rounded-xl items-center"
        >
            <Image
                width={12}
                height={12}
                src={icon}
                objectFit="cover"
                quality={100}
                alt={description}
                className="mr-5 max-w-48 max-h-48 w-12 h-12"
            />
                <div className="dark:text-white text-center">{name}</div>
        </div>
    );

}