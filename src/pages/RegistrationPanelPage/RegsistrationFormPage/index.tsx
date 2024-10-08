import { http } from '../../../service/http';
import { Input } from '../../../components/Input';
import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { FormBox } from '../../../components/FormContainer/FormBox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer } from '../../../components/FormContainer';
import { PageContainer } from '../../../components/PageContainer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { JobDto, createJobFormSchema } from '../../../constants/Jobs';

// Define os tipos para clients, employees e interns
type Client = {
    id: string;
    name: string;
};

type Employee = {
    id: string;
    name: string;
};

type Intern = {
    id: string;
    name: string;
};

export function RegistrationFormPage() {
    const [defaultInputValues, setDefaultInputValues] = useState({
        id: '',
        serviceType: '',
        employeId: '',
        internId: '',
        active: true,
        clientId: '',
    });
    const [clients, setClients] = useState<Client[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [interns, setInterns] = useState<Intern[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        register,
    } = useForm({
        resolver: zodResolver(createJobFormSchema),
        defaultValues: defaultInputValues,
    });

    async function fetchJobData(id: string | undefined) {
        try {
            const response = await http.get(`authenticated/jobs/${id}`);
            const job = response.data;
            console.log('JOB: ', job);

            // Atualize os valores padrão e o formulário com os dados do job
            setDefaultInputValues({
                id: job.id,
                serviceType: job.serviceType,
                employeId: job.employe?.id || '', // Ajuste para employeId
                internId: job.intern?.id || '', // Ajuste para internId
                active: job.active,
                clientId: job.clients[0]?.id || '', // Assume cliente único para simplicidade
            });

            reset({
                id: job.id,
                serviceType: job.serviceType,
                employeId: job.employe?.id || '',
                internId: job.intern?.id || '',
                active: job.active,
                clientId: job.clients[0]?.id || '',
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchClients() {
        try {
            const response = await http.get('authenticated/clients');
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchEmployees() {
        try {
            const response = await http.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchInterns() {
        try {
            const response = await http.get('authenticated/intern');
            setInterns(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(data: any) {
        console.log('Enviado!: ', data);
        try {
            const job: JobDto = {
                id: data.id,
                serviceType: data.serviceType,
                employe: data.employeId ? { id: data.employeId, name: '' } : undefined, // Inclua o nome do empregado se necessário
                intern: data.internId ? { id: data.internId, name: '' } : undefined, // Inclua o nome do estagiário se necessário
                active: data.active,
                clients: data.clientId ? [data.clientId] : [], // Ajuste para a lista de IDs dos clientes
            };

            if (id) {
                await http.put(`authenticated/jobs/${id}`, job);
            } else {
                await http.post('authenticated/jobs', job);
            }

            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchJobData(id);
        }
        fetchClients();
        fetchEmployees();
        fetchInterns(); // Busque interns quando o componente for montado
    }, [id]);

    return (
        <PageContainer>
            <Title>Cadastrar Atendimento</Title>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col justify-center gap-16'
            >
                <FormContainer title='Dados do Atendimento'>
                    <FormBox>
                        <Input
                            name='serviceType'
                            control={control}
                            label='Tipo de Serviço'
                            errors={errors.serviceType}
                            autoComplete='off'
                            placeholder='Tipo de serviço'
                        />

                        <div className='mb-4'>
                            <label htmlFor='employeId' className='block text-sm font-medium text-gray-700'>
                                Funcionário
                            </label>
                            <select
                                id='employeId'
                                {...register('employeId')}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                            >
                                <option value=''>Selecione um funcionário</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                            {errors.employeId && (
                                <p className='text-red-600 text-sm mt-2'>{errors.employeId.message}</p>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='internId' className='block text-sm font-medium text-gray-700'>
                                Estagiário
                            </label>
                            <select
                                id='internId'
                                {...register('internId')}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                            >
                                <option value=''>Selecione um estagiário</option>
                                {interns.map(intern => (
                                    <option key={intern.id} value={intern.id}>
                                        {intern.name}
                                    </option>
                                ))}
                            </select>
                            {errors.internId && (
                                <p className='text-red-600 text-sm mt-2'>{errors.internId.message}</p>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='clientId' className='block text-sm font-medium text-gray-700'>
                                Cliente
                            </label>
                            <select
                                id='clientId'
                                {...register('clientId')}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                            >
                                <option value=''>Selecione um cliente</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            {errors.clientId && (
                                <p className='text-red-600 text-sm mt-2'>{errors.clientId.message}</p>
                            )}
                        </div>
                    </FormBox>
                </FormContainer>

                <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-10 sm:gap-28'>
                    <Button
                        className='w-fit px-8 py-1.5'
                        variant='secondary'
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </Button>

                    <Button className='w-fit px-6 py-2' type='submit'>
                        Cadastrar
                    </Button>
                </div>
            </form>
        </PageContainer>
    );
}