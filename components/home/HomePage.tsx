import Page from "../common/Page";
import LoremIpsum from "../common/LoremIpsum";

export default async function HomePage() {
    return (
        <Page>
            <p>
                Hi, I'm Vahin, a 17 year old software developer with delusions of
                grandeur
            </p>

            <br />
            <br />
            <LoremIpsum paragraphs={20} />
        </Page>
    );
}
