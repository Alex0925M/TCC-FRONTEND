import { PageContainer } from "../../components/PageContainer";
import { Title } from "../../components/Title";
import {Settings} from 'lucide-react';

export function HomePage() {
    return (
        <PageContainer>
            <Settings className="ml-4 flex items-center w-full"></Settings>
            <Title>Bem vindo ao Logic Fly!</Title>
        </PageContainer>
    )
};
