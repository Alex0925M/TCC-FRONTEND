import { http } from '../../../service/http';
import { Input } from '../../../components/Input';
import { Title } from '../../../components/Title';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { FormBox } from '../../../components/FormContainer/FormBox';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '../../../components/PageContainer';
import { FormContainer } from '../../../components/FormContainer';
import { useEffect, useState } from 'react';
import {
    CompanySegments,
    CompanyQualifications,
    createCompanyFormSchema,
    CompanyDto,
} from '../../../constants/Companies';

export function CompanyFormPage() {
    const [segments, setSegments] = useState<CompanySegments[]>([]);
    const [qualifications, setQualifications] = useState<
        CompanyQualifications[]
    >([]);
    const [defaultInputValues, setDefaultInputValues] = useState({
        companyName: '',
        cnpj: '',
        segment: '',
        qualifications: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createCompanyFormSchema),
        defaultValues: {
            companyName: defaultInputValues.companyName,
            cnpj: defaultInputValues.cnpj,
            segment: defaultInputValues.segment,
            qualifications: defaultInputValues.qualifications,
        },
    });

    async function getEnumsOptions() {
        try {
            const [segmentsEnum, qualificationsEnum] = await Promise.all([
                http.get('/company/segments'),
                http.get('/company/qualifications'),
            ]);
            setSegments(segmentsEnum.data);
            setQualifications(qualificationsEnum.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getCompanyData(id: string | undefined) {
        try {
            const response = await http.get(`company/${id}`);
            const company = response.data;
            setDefaultInputValues({
                companyName: company.companyName,
                cnpj: company.cnpj,
                segment: company.segment,
                qualifications: company.qualifications,
            });

            reset({
                companyName: company.companyName,
                cnpj: company.cnpj,
                segment: company.segment,
                qualifications: company.qualifications,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(event: any) {
        console.log('Enviado!: ', event);
        try {
            const company: CompanyDto = {
                companyName: event.companyName,
                cnpj: event.cnpj,
                segment: event.segment,
                qualifications: event.qualifications,
                active: true,
            };

            id !== undefined
                ? await http.put('company', { id: id, ...company })
                : await http.post('company', company);

            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getCompanyData(id);
        }
        getEnumsOptions();
    }, []);

    return (
        <PageContainer>
            <Title>
                {id ? 'Atualizar dados da Empresa' : 'Cadastrar Empresa'}
            </Title>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col justify-center gap-16'
            >
                <FormContainer title='Dados da empresa'>
                    <FormBox>
                        <Input
                            name='companyName'
                            control={control}
                            label='Nome da empresa'
                            errors={errors.companyName}
                            autoComplete='off'
                            placeholder='Freddy FazzBear Pizzeria'
                        />

                        <Input
                            name='cnpj'
                            control={control}
                            label='CNPJ'
                            errors={errors.cnpj}
                            autoComplete='off'
                            placeholder='12345678900000'
                        />

                        <Select
                            name='segment'
                            control={control}
                            errors={errors.segment}
                            label='Segmento'
                        >
                            <option disabled value=''>
                                Selecione...
                            </option>
                            {segments &&
                                segments.map((segment, index) => (
                                    <option key={index} value={segment}>
                                        {segment}
                                    </option>
                                ))}
                        </Select>

                        <Select
                            name='qualifications'
                            control={control}
                            errors={errors.qualifications}
                            label='Qualificação'
                        >
                            <option disabled value=''>
                                Selecione...
                            </option>
                            {qualifications &&
                                qualifications.map((qualification, index) => (
                                    <option key={index} value={qualification}>
                                        {qualification}
                                    </option>
                                ))}
                        </Select>
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
                        {id ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                </div>
            </form>
        </PageContainer>
    );
}
