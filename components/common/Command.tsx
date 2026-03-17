type Props = {
    command: string
}

export default function Command({ command }: Props) {

    return (
        <p className="-ml-5 text-gray-300 opacity-75">
            <span className="text-purple-500">$</span> {command}
        </p>
    );

}