import Section from "../common/Section";
import Repositories from "../common/Repositories";

export default async function Projects() {
    return (
        <div>
            <Section index="01" label="repos" heading="all my projects">
                <Repositories username="shadowfox88"/>
            </Section>
        </div>
    );
}