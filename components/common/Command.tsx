import clsx from 'clsx';

type Props = {
    command: string,
    className?: string,
}

export default function Command({ command, className }: Props) {
    // className = className?.split(" ").filter(Boolean).map(_ => "!" + _).join(" ")

    return (
        <div className={clsx("text-neutral-500 opacity-75", className)}>
            <span className="text-purple-500">$</span> {command}
        </div>
    );
}
