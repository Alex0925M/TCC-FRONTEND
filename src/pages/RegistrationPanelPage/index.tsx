import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router';
import { PageContainer } from '../../components/PageContainer';
import { Briefcase, Plus} from 'lucide-react';

export function RegistrationPanelPage(){
    const navigate = useNavigate();

    return(
        <PageContainer>
            <Title>Painel de Atendimentos</Title>
                <div className='flex flex-col justify-center w-full'>
                    <div className='flex items-center flex-wrap xl:h-[100px] border-2 p-4 mb-4'>
                        <div className='flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-evenly w-full gap-4'>
                            <strong className='text-lg px-4 min-w-[150px] text-center sm:text-start'>
                                Atendimento
                            </strong>

                            <Button
                                className='flex items-center gap-4 justify-center h-[55px]'
                                onClick={() => {
                                    navigate('/register-service');
                                }}
                            >
                                <Plus className='hidden md:inline-flex' />
                                <p>Novo Atendimento</p>
                             </Button>

                               <Button
                            className='flex items-center gap-4 justify-center h-[55px] px-2'
                            onClick={() => {
                                navigate('/infos-services');
                            }}
                        >
                            <Briefcase className='hidden md:inline-flex' />
                            <p>Ver Todos</p>
                        </Button> 
                        </div>
                    </div>
                </div>
        </PageContainer>

    )

}