type Props = {
    paragraphs: number,
};

const loremIpsumText = [
        'Lorem ipsum dolor sit amet, consectetur',
        'adipiscing elit, sed do eiusmod tempor',
        'incididunt ut labore et dolore magna',
        'aliqua. Diam in arcu cursus euismod',
        'quis viverra nibh. Nunc aliquet bibendum',
        'enim facilisis gravida neque convallis',
        'a cras. Sagittis purus sit amet volutpat',
        'Consequat mauris. Duis ultricies lacus',
        'sed turpis tincidunt id. Consequat interdum',
        'varius sit amet mattis vulputate. Enim sed',
        'faucibus turpis in eu. Ridiculus mus mauris',
        'vitae ultricies leo integer malesuada nunc vel.',
        'Nulla pharetra diam sit amet nisl suscipit.',
        'Lobortis elementum nibh tellus molestie nunc',
        'non blandit massa enim. Dis parturient montes',
        'nascetur ridiculus mus. Justo nec ultrices dui',
        'sapien eget. Enim tortor at auctor urna nunc.',
        'Dictumst quisque sagittis purus sit amet volutpat',
        'consequat mauris nunc.'
    ].join("\n"); // this is 19 lines long

export default function LoremIpsum({paragraphs}: Props) {
    let output = "\n\n"

    for (let i = 0; i < paragraphs; i++) {
        output += loremIpsumText
        output += "\n\n\n"
    }

    return (
        <div>
            {output.split('\n').map((item, i) => <p key={i}>{item}</p>)}
        </div>
    )
}