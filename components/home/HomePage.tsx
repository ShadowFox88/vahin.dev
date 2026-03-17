import Page from "../common/Page";
import LoremIpsum from "../common/LoremIpsum";
import Command from "../common/Command"

export default async function HomePage() {
    return (
        <Page>
            <Command command="whoami" />
            <p>
                Hi, I'm Vahin, a 17 year old software developer with delusions of
                grandeur
            </p>

            <br />
            <br />
            <Command command="cat loremipsum.txt | head -n 380" />
            <LoremIpsum paragraphs={20} />
        </Page>
    );
}
