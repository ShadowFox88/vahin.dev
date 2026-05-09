import { Repositories } from "../common/Github";

import Section from "../common/Section";

export async function Projects() {
    return (
        <div>
            <Section index="01" label="repos" heading="all my projects">
                <Repositories username="shadowfox88"/>
            </Section>
        </div>
    );
}