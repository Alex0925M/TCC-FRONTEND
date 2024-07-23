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
import {
    EmployeeDto,
    createEmployeeFormSchema,
} from '../../../constants/Employees';

export function EmployeeFormPage() {
    const [defaultInputValues, setDefaultInputValues] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        birth: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createEmployeeFormSchema),
        defaultValues: {
            name: defaultInputValues.name,
            cpf: defaultInputValues.cpf,
            email: defaultInputValues.email,
            phone: defaultInputValues.phone,
            birth: defaultInputValues.birth,
        },
    });

    async function getEmployeeData(id: string | undefined) {
        try {
            const response = await http.get(`employees/${id}`);
            const employee = response.data;
            console.log('EMPLOYEE: ', employee);
            setDefaultInputValues({
                name: employee.name,
                cpf: employee.cpf,
                email: employee.email,
                phone: employee.phone,
                birth: employee.birth,
            });

            reset({
                name: employee.name,
                cpf: employee.cpf,
                email: employee.email,
                phone: employee.phone,
                birth: employee.birth,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(event: any) {
        console.log('Enviado!: ', event);
        try {
            const employee: EmployeeDto = {
                name: event.name,
                cpf: event.cpf,
                email: event.email,
                phone: event.phone,
                birth: event.birth,
                ativo: true,
            };

            id !== undefined
                ? await http.put('employees', { id: id, ...employee })
                : await http.post('employees', employee);

            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getEmployeeData(id);
        }
    }, []);

    return (
        <PageContainer>
            <Title>Cadastrar Funcionário</Title>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col justify-center gap-16'
            >
                <FormContainer title='Dados pessoais'>
                    <FormBox>
                        <Input
                            name='name'
                            control={control}
                            label='Nome'
                            errors={errors.name}
                            autoComplete='name'
                            placeholder='Rubens da Silva Sauro'
                        />

                        <Input
                            name='cpf'
                            control={control}
                            label='CPF'
                            errors={errors.cpf}
                            autoComplete='off'
                            placeholder='12345678900'
                        />

                        <Input
                            name='email'
                            control={control}
                            label='Email'
                            errors={errors.email}
                            autoComplete='email'
                            placeholder='email@example.com'
                        />

                        <Input
                            name='phone'
                            control={control}
                            label='Celular'
                            errors={errors.phone}
                            autoComplete='on'
                            placeholder='1899999999'
                        />

                        <Input
                            name='birth'
                            control={control}
                            label='Nascimento'
                            errors={errors.birth}
                            placeholder='12/12/2022'
                            autoComplete='off'
                            type='date'
                        />
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
