import { http } from '../../../service/http';
import { Title } from '../../../components/Title';
import { v4 as UUID } from 'uuid';
import { useNavigate } from 'react-router';
import { PageContainer } from '../../../components/PageContainer';
import { SearchOutlined } from '@ant-design/icons';
import { Button as MyButton } from '../../../components/Button';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef, MenuProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import {
    CompanySegments,
    CompanyQualifications,
} from '../../../constants/Companies';
import { Button, Input, Popconfirm, Space, Table, message } from 'antd';
import {
    Edit,
    Trash2,
    PlusIcon,
    Building2,
    ArrowLeft,
    CheckCheck,
    Archive,
    ArchiveRestore,
    RotateCcw,
} from 'lucide-react';
import AntdDropdown from '../../../components/AntDesign/AntdDropdown';

type ShowCompanies = {
    id: string;
    cnpj: string;
    companyName: string;
    segment: CompanySegments;
    qualifications: CompanyQualifications;
    dateOfCreation: string;
    active: boolean;
};

interface DataType {
    key: string;
    id: string;
    cnpj: string;
    companyName: string;
    segment: CompanySegments;
    qualifications: CompanyQualifications;
    dateOfCreation: string;
    active: string;
}

export function CompaniesInfosPage() {
    const [allCompanies, setAllCompanies] = useState<ShowCompanies[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const navigate = useNavigate();

    async function getAllCompanies() {
        try {
            const response = await http.get('authenticated/company');
            setAllCompanies(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const companiesData: DataType[] = allCompanies.map((c: ShowCompanies) => {
        let date = new Date(c.dateOfCreation).toLocaleDateString('pt-BR');
        return {
            key: UUID(),
            id: c.id,
            cnpj: c.cnpj,
            companyName: c.companyName,
            segment: c.segment,
            qualifications: c.qualifications,
            dateOfCreation: date,
            active: c.active ? 'Ativo' : 'Inativo',
        };
    });

    const activeCompaniesData: DataType[] = companiesData.filter(
        (c: DataType) => c.active === 'Ativo'
    );

    useEffect(() => {
        getAllCompanies();
    }, []);

    return (
        <PageContainer>
            <Title>Empresas</Title>
            <div className='flex items-center justify-between w-[280px]'>
                <Button
                    onClick={() => {
                        setOnlyActive(!onlyActive);
                    }}
                >
                    {onlyActive ? (
                        <div className='flex items-center gap-2'>
                            <ArchiveRestore size={18} />
                            Todos
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Archive size={18} />
                            Apenas ativos
                        </div>
                    )}
                </Button>

                <Button
                    className='flex items-center gap-2'
                    onClick={() => location.reload()}
                >
                    <RotateCcw size={18} />
                    Recarregar
                </Button>
            </div>

            <CompanyData
                data={onlyActive ? activeCompaniesData : companiesData}
            />

            <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-10 sm:gap-28'>
                <MyButton
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    variant='secondary'
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} />
                    Voltar
                </MyButton>

                <MyButton
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    onClick={() => navigate('/register-client')}
                >
                    <PlusIcon size={20} />
                    Novo
                </MyButton>
            </div>
        </PageContainer>
    );
}

function CompanyData({ data }: { data: DataType[] }) {
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();

    function handleSearch(confirm: (param?: FilterConfirmProps) => void) {
        confirm();
    }

    function handleReset(clearFilters: () => void) {
        clearFilters();
    }

    async function handleDelete(id: string) {
        try {
            await http.delete(`authenticated/company/${id}`);
            message.success('Empresa removida com sucesso!');
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }

    async function handleStatus(id: string) {
        try {
            await http.put('authenticated/company', {
                id: id,
                active: true,
            });
            message.success('Empresa ativada com sucesso!');
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }

    const getColumnSearchProps = (
        dataIndex: keyof DataType
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters);
                        }}
                    >
                        Limpar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677FF' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'CNPJ',
            dataIndex: 'cnpj',
            key: 'cnpj',
            width: '20%',
            ...getColumnSearchProps('cnpj'),
        },
        {
            title: 'Nome Fantasia',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '30%',
            ...getColumnSearchProps('companyName'),
        },
        {
            title: 'Segmento',
            dataIndex: 'segment',
            key: 'segment',
            width: '15%',
            ...getColumnSearchProps('segment'),
        },
        {
            title: 'Qualificação',
            dataIndex: 'qualifications',
            key: 'qualifications',
            width: '15%',
            ...getColumnSearchProps('qualifications'),
        },
        {
            title: 'Criado em',
            dataIndex: 'dateOfCreation',
            key: 'dateOfCreation',
            width: '15%',
            ...getColumnSearchProps('dateOfCreation'),
            sorter: (a, b) =>
                Number(a.dateOfCreation.slice(0, 2)) -
                Number(b.dateOfCreation.slice(0, 2)),
            sortDirections: ['descend', 'ascend'],
        },
        {
            className: 'hidden sm:inline-flex',
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            ...getColumnSearchProps('active'),
            render: (_, record) => (
                <strong
                    className={`${
                        record.active === 'Ativo'
                            ? 'text-blue-primary'
                            : 'text-blue-background'
                    } uppercase`}
                >
                    {record.active}
                </strong>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            width: '5%',
            render: (_, record) => {
                const items: MenuProps['items'] = [
                    {
                        label: (
                            <Button
                                className='flex items-center justify-center gap-2 w-full capitalize font-semibold'
                                onClick={() => {
                                    console.log('RECORD', record);
                                    navigate(
                                        `/infos-company/edit/${record.id}`
                                    );
                                }}
                            >
                                <Edit size={18} />
                                Editar
                            </Button>
                        ),
                        key: '0',
                    },
                    {
                        label: (
                            <Button
                                className='flex items-center justify-center gap-2 w-full capitalize font-semibold'
                                onClick={() => navigate(`edit/${record.id}`)}
                            >
                                <Building2 size={18} />
                                Detalhes
                            </Button>
                        ),
                        key: '2',
                    },
                    {
                        label:
                            record.active === 'Ativo' ? (
                                <DeletePopup
                                    onDelete={() => handleDelete(record.id)}
                                />
                            ) : (
                                <ActivePopup
                                    onActive={() => handleStatus(record.id)}
                                />
                            ),
                        key: '1',
                    },
                ];

                return (
                    <AntdDropdown
                        className='flex items-center text-black hover:text-blue-400 px-0'
                        title=''
                        options={items}
                    />
                );
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
        />
    );
}

function DeletePopup({
    onDelete,
}: {
    onDelete:
        | ((e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void)
        | undefined;
}) {
    return (
        <Popconfirm
            className='flex items-center justify-center gap-2 w-full select-none'
            title='Excluir cliente?'
            placement='left'
            description='Tem certeza que deseja exlcuir este cliente?'
            okText='Excluir'
            okType='danger'
            cancelText='Voltar'
            onCancel={() => {}}
            onConfirm={onDelete}
        >
            <Button type='primary' danger>
                <Trash2 size={18} />
                Excluir
            </Button>
        </Popconfirm>
    );
}

function ActivePopup({
    onActive,
}: {
    onActive:
        | ((e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void)
        | undefined;
}) {
    return (
        <Popconfirm
            className='flex items-center justify-center gap-2 w-full select-none'
            title='Ativar cliente?'
            placement='left'
            description='Deseja reativar este cliente?'
            okText='Ativar'
            okType='default'
            cancelText='Voltar'
            onCancel={() => {}}
            onConfirm={onActive}
        >
            <Button className='bg-sky-100'>
                <CheckCheck size={18} />
                Ativar
            </Button>
        </Popconfirm>
    );
}
