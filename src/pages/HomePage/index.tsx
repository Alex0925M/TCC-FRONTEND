import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/PageContainer";
import { Title } from "../../components/Title";
import { Button, Card } from "flowbite-react";
import { User, PenSquare } from "lucide-react";

export function HomePage() {
    const navigate = useNavigate();

    const handleNavigateToEmployees = () => {
        navigate("/register-employee"); 
    };

    const handleNavigateToRegisterClient = () => {
        navigate("/register-client"); 
    };

    const handleNavigateToRegisterCompany = () => {
        navigate("/register-company"); 
    };

    const handleNavigateToRegisterService = () => {
        navigate("/register-service");
    };

    const handleNavigateToRegisterIntern = () => {
        navigate("/register-intern");
    };

    return (
        <PageContainer>
            <Title>Bem-vindo ao Logic Fly!</Title>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
                {/* Card 1 */}
                <Card className="max-w-sm bg-blue-800 border border-gray-700 p-5">
                    <h5 className="text-2xl font-bold tracking-tight text-white text-center">
                        Cadastro de Funcionários
                    </h5>
                    <p className="font-normal text-white text-center mb-4">
                        Cadastre os seus funcionários com todas as informações necessárias.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleNavigateToEmployees}>
                        Cadastre o Funcionário 
                        <User className="text-grey ml-2 w-4" />
                    </Button>
                </Card>

                {/* Card 2 */}
                <Card className="max-w-sm bg-blue-800 border border-gray-700 p-5">
                    <h5 className="text-2xl font-bold tracking-tight text-white text-center">
                        Cadastro de Clientes
                    </h5>
                    <p className="font-normal text-white text-center mb-4">
                        Realize o cadastro dos seus clientes para futuros atendimentos.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleNavigateToRegisterClient}>
                        Cadastre os Clientes
                        <PenSquare className="text-grey ml-2 w-4" />
                    </Button>
                </Card>

                {/* Card 3 */}
                <Card className="max-w-sm bg-blue-800 border border-gray-700 p-5">
                    <h5 className="text-2xl font-bold tracking-tight text-white text-center">
                        Cadastro de Empresas
                    </h5>
                    <p className="font-normal text-white text-center mb-4">
                        Realize o cadastro das empresas para futuros atendimentos.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleNavigateToRegisterCompany}>
                        Cadastre as Empresas
                        <PenSquare className="text-grey ml-2 w-4" />
                    </Button>
                </Card>

                {/* Card 4 */}
                <Card className="max-w-sm bg-blue-800 border border-gray-700 p-5">
                    <h5 className="text-2xl font-bold tracking-tight text-white text-center">
                        Cadastro de Atendimentos
                    </h5>
                    <p className="font-normal text-white text-center mb-4">
                        Realize o cadastro dos seus atendimentos.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-ful mt-6" onClick={handleNavigateToRegisterService}>
                        Registre os Atendimentos
                        <PenSquare className="text-grey ml-2 w-4" />
                    </Button>
                </Card>

                {/* Card 5 */}
                <Card className="max-w-sm bg-blue-800 border border-gray-700 p-5">
                    <h5 className="text-2xl font-bold tracking-tight text-white text-center">
                        Cadastro de Estagiários
                    </h5>
                    <p className="font-normal text-white text-center mb-4">
                        Realize o cadastro dos seus estagiários e aprendizes.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={handleNavigateToRegisterIntern}>
                        Cadastro de Estagiários
                        <PenSquare className="text-grey ml-2 w-4" />
                    </Button>
                </Card>
            </div>
        </PageContainer>
    );
}
