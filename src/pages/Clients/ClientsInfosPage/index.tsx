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
import { Button, Input, Popconfirm, Space, Table, message } from 'antd';
import {
    Edit,
    User2,
    Trash2,
    PlusIcon,
    ArrowLeft,
    CheckCheck,
    ArchiveRestore,
    Archive,
    RotateCcw,
} from 'lucide-react';
import AntdDropdown from '../../../components/AntDesign/AntdDropdown';

type ShowClients = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birth: string;
    adresses: {
        city: string;
        district: string;
        number: string;
    };
    status: boolean;
};

interface DataType {
    key: string;
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birth: string;
    adress: string;
    status: string;
}

export function ClientsInfosPage() {
    const [allClients, setAllClients] = useState<ShowClients[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const navigate = useNavigate();

    async function getAllClients() {
        try {
            const response = await http.get('clients');
            setAllClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const clientsData: DataType[] = allClients.map((c: ShowClients) => {
        let date = new Date(c.birth).toLocaleDateString('pt-BR');
        return {
            key: UUID(),
            id: c.id,
            name: c.name,
            email: c.email,
            cpf: c.cpf,
            phone: c.phone,
            birth: date,
            adress: `${c.adresses.city}, ${c.adresses.number}, ${c.adresses.district}`,
            status: String(c.status) === 'true' ? 'Ativo' : 'Inativo',
        };
    });
    const activeClients: DataType[] = clientsData.filter(
        (client: DataType) => client.status === 'Ativo'
    );

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <PageContainer>
            <Title>Clientes</Title>
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

            <ClientsData data={onlyActive ? activeClients : clientsData} />

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

function ClientsData({ data }: { data: DataType[] }) {
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
            await http.delete(`clients/${id}`);
            message.success('Cliente removido com sucesso!');
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }

    async function handleStatus(id: string) {
        try {
            await http.put('clients', {
                id: id,
                status: true,
            });
            message.success('Cliente ativado com sucesso!');
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
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            width: '10%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Contato',
            dataIndex: 'phone',
            key: 'phone',
            width: '5%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Nascimento',
            dataIndex: 'birth',
            key: 'birth',
            width: '5%',
            ...getColumnSearchProps('birth'),
            sorter: (a, b) =>
                Number(a.birth.slice(0, 2)) - Number(b.birth.slice(0, 2)),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Endereço',
            dataIndex: 'adress',
            key: 'adress',
            width: '28%',
            ...getColumnSearchProps('adress'),
        },
        {
            className: 'hidden sm:inline-flex',
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '2%',
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <strong
                    className={`${
                        record.status === 'Ativo'
                            ? 'text-blue-primary'
                            : 'text-blue-background'
                    } uppercase`}
                >
                    {record.status}
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
                                onClick={() =>
                                    navigate(`/infos-client/edit/${record.id}`)
                                }
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
                                <User2 size={18} />
                                Detalhes
                            </Button>
                        ),
                        key: '2',
                    },
                    {
                        label:
                            record.status === 'Ativo' ? (
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
