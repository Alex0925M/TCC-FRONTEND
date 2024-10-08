import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router';
import { PageContainer } from '../../components/PageContainer';
import { Briefcase, Building2, Plus, Users } from 'lucide-react';

export function AdminPanelPage() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Title>Painel do Administrador</Title>

            <div className='flex flex-col justify-center w-full'>
                <div className='flex items-center flex-wrap xl:h-[100px] border-2 p-4 mb-4'>
                    <div className='flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-evenly w-full gap-4'>
                        <strong className='text-lg px-4 min-w-[150px] text-center sm:text-start'>
                            Funcionário
                        </strong>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/register-employee');
                            }}
                        >
                            <Plus className='hidden md:inline-flex' />
                            <p>Novo</p>
                        </Button>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px] px-2'
                            onClick={() => {
                                navigate('/infos-employees');
                            }}
                        >
                            <Briefcase className='hidden md:inline-flex' />
                            <p>Ver Todos</p>
                        </Button>
                    </div>
                </div>
                
                <div className='flex items-center flex-wrap xl:h-[100px] border-2 p-4 mb-4'>
                    <div className='flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-evenly w-full gap-4'>
                        <strong className='text-lg px-4 min-w-[150px] text-center sm:text-start'>
                            Cliente
                        </strong>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/register-client');
                            }}
                        >
                            <Plus className='hidden md:inline-flex' />
                            <p>Novo</p>
                        </Button>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/infos-clients');
                            }}
                        >
                            <Users className='hidden md:inline-flex' />
                            <p>Ver Todos</p>
                        </Button>
                    </div>
                </div>
                <div className='flex items-center flex-wrap xl:h-[100px] border-2 p-4 mb-4'>
                    <div className='flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-evenly w-full gap-4'>
                        <strong className='text-lg px-4 min-w-[150px] text-center sm:text-start'>
                            Empresa
                        </strong>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/register-company');
                            }}
                        >
                            <Plus className='hidden md:inline-flex' />
                            <p>Novo</p>
                        </Button>

                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/infos-companies');
                            }}
                        >
                            <Building2 className='hidden md:inline-flex' />
                            <p>Ver Todos</p>
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex items-center flex-wrap xl:h-[100px] border-2 p-4 mb-4'>
                <div className='flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-evenly w-full gap-4'>
                        <strong className='text-lg px-4 min-w-[150px] text-center sm:text-start'>
                            Estagiário
                        </strong>
                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/register-intern');
                            }}
                        >
                            <Plus className='hidden md:inline-flex' />
                            <p>Novo</p>
                        </Button>
                        <Button
                            className='flex items-center gap-4 justify-center h-[55px]'
                            onClick={() => {
                                navigate('/infos-interns');
                            }}
                        >
                            <Building2 className='hidden md:inline-flex' />
                            <p>Ver Todos</p>
                        </Button>
                </div>
            </div>
            
        </PageContainer>
    );
}
