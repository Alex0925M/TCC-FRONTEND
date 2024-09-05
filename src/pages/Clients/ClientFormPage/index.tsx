import { http } from '../../../service/http';
import { Title } from '../../../components/Title';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { FormBox } from '../../../components/FormContainer/FormBox';
import { useForm } from 'react-hook-form';
import { v4 as UUID } from 'uuid';
import { InputStyle } from '../../../constants/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer } from '../../../components/FormContainer';
import { PageContainer } from '../../../components/PageContainer';
import AntdTable, { DataType } from '../../../components/AntDesign/AntdTable';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CompanyDto, CompanyEntity } from '../../../constants/Companies';
import { ClientDto, createClientFormSchema } from '../../../constants/Clients';
import AntdSelect from '../../../components/AntDesign/AntdSelect';
import { AxiosError } from 'axios';

const perPage = [
    { value: 6, label: '6' },
    { value: 10, label: '10' },
];

export function ClientFormPage() {
    const [selectedOption, setSelectedOption] = useState<number>(6);
    const [allCompanies, setAllCompanies] = useState<DataType[]>([]);
    const [companyRelation, setCompanyRelation] = useState<string[]>([]);
    const [defaultInputValues, setDefaultInputValues] = useState({
        cpf: '',
        phone: '',
        birth: '',
        email: '',
        number: '',
        street: '',
        district: '',
        zipcode: '',
        city: '',
        name: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createClientFormSchema),
        defaultValues: {
            cpf: defaultInputValues.cpf || 'XXX.XXX.XXX-XX',
            phone: defaultInputValues.phone || '(XX)XXXXX-XXXX',
            birth: defaultInputValues.birth || '',
            email: defaultInputValues.email || 'email@dominio.com',
            number: defaultInputValues.number || 'XXX',
            street: defaultInputValues.street || 'Rua',
            district: defaultInputValues.district || 'Bairro',
            zipcode: defaultInputValues.zipcode || 'Cep',
            city: defaultInputValues.city || 'Cidade',
            name: defaultInputValues.name || 'Nome',
        },
    });

    function handleSelectCompany(event: any) {
        setSelectedOption(event);
    }

    async function getAllCompanies() {
        try {
            const response = await http.get<CompanyEntity[]>('authenticated/company');
            const companies: CompanyDto[] = response.data.map(
                (company: CompanyEntity) => new CompanyDto(company)
            );

            const mappedCompanies = companies.map((company: CompanyDto) => {
                return { ...company, key: UUID().toString() };
            });

            setAllCompanies(mappedCompanies);
        } catch (error) {
            console.error(error);
        }
    }

    async function getClientData(id: string | undefined) {
        try {
            const response = await http.get(`authenticated/clients/${id}`);
            const client = response.data;
            setDefaultInputValues({
                cpf: client.cpf,
                phone: client.phone,
                birth: client.birth,
                email: client.email,
                number: client.adresses.number,
                street: client.adresses.street,
                district: client.adresses.district,
                zipcode: client.adresses.zipcode,
                city: client.adresses.city,
                name: client.name,
            });

            reset({
                cpf: client.cpf,
                phone: client.phone,
                birth: client.birth,
                email: client.email,
                number: String(client.adresses.number),
                street: client.adresses.street,
                district: client.adresses.district,
                zipcode: String(client.adresses.zipcode),
                city: client.adresses.city,
                name: client.name,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(event: any) {
        try {
            const client: ClientDto = {
                cpf: event.cpf,
                phone: event.phone,
                birth: event.birth,
                email: event.email,
                adress: {
                    number: event.number,
                    street: event.street,
                    district: event.district,
                    zipcode: event.zipcode,
                    city: event.city,
                },
                name: event.name,
            };
            console.log('Enviado!: ', client);
    
            const response = id
                ? await http.put(`authenticated/clients/${id}`, client)
                : await http.post('authenticated/clients', client);
    
            const registeredClient: ClientDto = response.data;
    
            if (companyRelation.length > 0) {
                await http.put(`authenticated/clients/${registeredClient.id}/authenticated/company`, {
                    company: companyRelation,
                });
                console.log('Companies added successfully.');
            }
    
            navigate(-1);
        } catch (error) {
            if (error instanceof AxiosError) {
                // AxiosError é uma forma específica de erro HTTP
                console.error('Erro ao enviar dados: ', error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error('Erro ao enviar dados: ', error.message);
            } else {
                console.error('Erro desconhecido: ', error);
            }
        }
    }
    

    useEffect(() => {
        if (id !== undefined) {
            getClientData(id);
        }
        getAllCompanies();
    }, []);

    return (
        <PageContainer>
            <Title>
                {id ? 'Atualizar dados do Cliente' : 'Cadastrar Cliente'}
            </Title>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col justify-center gap-16'
            >
                <FormContainer title='Dados pessoais'>
                    <FormBox>
                        <Input
                            name='name'
                            label='Nome'
                            control={control}
                            errors={errors.name}
                            autoComplete='name'
                            placeholder='Rubens da Cunha Junior'
                        />
                        <Input
                            name='cpf'
                            label='CPF'
                            control={control}
                            errors={errors.cpf}
                            autoComplete='off'
                            placeholder='12345678900'
                        />
                        <Input
                            name='email'
                            label='Email'
                            control={control}
                            errors={errors.email}
                            autoComplete='email'
                            placeholder='email@example.com'
                        />
                        <Input
                            name='phone'
                            label='Celular'
                            control={control}
                            errors={errors.phone}
                            autoComplete='off'
                            placeholder='18998788989'
                        />
                        <Input
                            name='birth'
                            label='Nascimento'
                            control={control}
                            errors={errors.birth}
                            type='date'
                            autoComplete='off'
                        />
                    </FormBox>
                </FormContainer>

                <FormContainer title='Endereço'>
                    <FormBox>
                        <Input
                            name='zipcode'
                            label='CEP'
                            control={control}
                            placeholder='19800000'
                            errors={errors.zipcode}
                            autoComplete='off'
                        />
                        <Input
                            name='city'
                            label='Cidade'
                            control={control}
                            placeholder='Assis'
                            errors={errors.city}
                            autoComplete='name'
                        />
                        <Input
                            name='street'
                            label='Rua'
                            control={control}
                            placeholder='Av. Rui Barbosa'
                            errors={errors.street}
                            autoComplete='name'
                        />
                        <Input
                            name='number'
                            label='Número'
                            control={control}
                            placeholder='1234'
                            errors={errors.number}
                            autoComplete='off'
                        />
                        <Input
                            name='district'
                            label='Bairro'
                            control={control}
                            placeholder='Centro'
                            errors={errors.district}
                            autoComplete='name'
                        />
                    </FormBox>
                </FormContainer>

                <FormContainer
                    title='Cnpj Relacionado'
                    style='hidden sm:inline-flex'
                >
                    <FormBox>
                        <div className='flex flex-col justify-center xl:items-center'>
                            <div className='flex flex-col justify-center'>
                                <label
                                    htmlFor='cnpj'
                                    className='select-none font-semibold text-lg capitalize'
                                >
                                    CNPJ
                                </label>

                                <input
                                    name='cnpj'
                                    className={InputStyle}
                                    placeholder='12345678900000'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center xl:items-center'>
                            <div className='flex flex-col justify-center'>
                                <label
                                    htmlFor='segment'
                                    className='select-none font-semibold text-lg capitalize'
                                >
                                    Segmento
                                </label>

                                <input
                                    name='segment'
                                    className={InputStyle}
                                    placeholder='Teste'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center xl:items-center'>
                            <div className='flex flex-col justify-center'>
                                <label
                                    htmlFor='qualifications'
                                    className='select-none font-semibold text-lg capitalize'
                                >
                                    Qualicações
                                </label>

                                <input
                                    name='cnpj'
                                    className={InputStyle}
                                    placeholder='Qualidade'
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                        <Button className='h-[40px] px-6 py-2 mt-[27.5px] duration-200 w-[270px]'>
                            Pesquisar
                        </Button>
                    </FormBox>

                    <div className='border-b-[3px] border-gray-200' />

                    <div className='flex flex-col justify-center gap-2 w-full'>
                        <h3 className='font-bold text-xl text-gray-400 uppercase'>
                            SELECIONADOS
                        </h3>

                        <div className='flex items-center gap-2'>
                            <AntdSelect
                                options={perPage}
                                handleChange={handleSelectCompany}
                            />

                            <p className='text-black-500'>Por página</p>
                        </div>

                        <AntdTable
                            dataSource={allCompanies}
                            pagination={{ pageSize: selectedOption }}
                            companyRelation={setCompanyRelation}
                        />
                    </div>
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
