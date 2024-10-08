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
    InternDto,
    createInternFormSchema,
} from '../../../constants/Intern';

export function InternFormPage() {
    const [defaultInputValues, setDefaultInputValues] = useState({
        name: '',
        cpf: '',
        email: '',
        ativo: true,
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createInternFormSchema),
        defaultValues: {
            name: defaultInputValues.name,
            cpf: defaultInputValues.cpf,
            email: defaultInputValues.email,
            ativo: defaultInputValues.ativo,
        },
    });

    async function getInternData(id: string | undefined) {
        try {
            const response = await http.get(`authenticated/intern/${id}`);
            const intern = response.data;
            console.log('INTERN: ', intern);
            setDefaultInputValues({
                name: intern.name,
                cpf: intern.cpf,
                email: intern.email,
                ativo: intern.ativo,
            });

            reset({
                name: intern.name,
                cpf: intern.cpf,
                email: intern.email,
                ativo: intern.ativo,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(event: any) {
        console.log('Enviado!: ', event);
        try {
            const intern: InternDto = {
                name: event.name,
                cpf: event.cpf,
                email: event.email,
                ativo: event.ativo,
            };

            id !== undefined
                ? await http.put('authenticated/intern', { id: id, ...intern })
                : await http.post('authenticated/intern', intern);

            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getInternData(id);
        }
    }, [id]);

    return (
        <PageContainer>
            <Title>Cadastrar Estagiário</Title>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col justify-center gap-16'
            >
                <FormContainer title='Dados do Estagiário'>
                    <FormBox>
                        <Input
                            name='name'
                            control={control}
                            label='Nome'
                            errors={errors.name}
                            autoComplete='name'
                            placeholder='Nome do Estagiário'
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
                            name='ativo'
                            control={control}
                            label='Ativo'
                            errors={errors.ativo}
                            type='checkbox'
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