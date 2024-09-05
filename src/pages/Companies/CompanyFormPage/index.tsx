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
    const [qualifications, setQualifications] = useState<CompanyQualifications[]>([]);
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
            companyName: '',
            cnpj: '',
            segment: '',
            qualifications: '',
        },
    });

    // Fetch enums for segments and qualifications
    async function getEnumsOptions() {
        try {
            const [segmentsResponse, qualificationsResponse] = await Promise.all([
                http.get('authenticated/company/segments'),
                http.get('authenticated/company/qualifications'),
            ]);
            setSegments(segmentsResponse.data);
            setQualifications(qualificationsResponse.data);
        } catch (error) {
            console.error('Erro ao buscar opções:', error);
        }
    }

    // Fetch company data if editing an existing company
    async function getCompanyData(id: string | undefined) {
        if (!id) return;
        try {
            const response = await http.get(`authenticated/company/${id}`);
            const company = response.data;
            reset({
                companyName: company.companyName,
                cnpj: company.cnpj,
                segment: company.segment || '',
                qualifications: company.qualifications || '',
            });
        } catch (error) {
            console.error('Erro ao buscar dados da empresa:', error);
        }
    }

    // Handle form submission
    async function onSubmit(data: any) {
        try {
            const company: CompanyDto = {
                companyName: data.companyName,
                cnpj: data.cnpj,
                segment: data.segment,
                qualifications: data.qualifications,
                active: true,
            };

            if (id) {
                await http.put(`authenticated/company/${id}`, company);
            } else {
                await http.post('authenticated/company', company);
            }

            navigate(-1);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    }

    useEffect(() => {
        getEnumsOptions();
        if (id) {
            getCompanyData(id);
        }
    }, [id]);

    return (
        <PageContainer>
            <Title>{id ? 'Atualizar dados da Empresa' : 'Cadastrar Empresa'}</Title>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-16'>
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
                            {segments.map((segment, index) => (
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
                            {qualifications.map((qualification, index) => (
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
