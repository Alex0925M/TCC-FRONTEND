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
    Trash2,
    PlusIcon,
    Building2,
    ArrowLeft,
    CheckCheck,
    RotateCcw,
    Archive,
    ArchiveRestore,
} from 'lucide-react';
import AntdDropdown from '../../../components/AntDesign/AntdDropdown';

type ShowEmployees = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birth: string;
    status: boolean;
};

interface DataType {
    key: string;
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birth: string;
    status: string;
}

export function EmployeesInfosPage() {
    const [allEmployees, setAllEmployees] = useState<ShowEmployees[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const navigate = useNavigate();

    async function getAllEmployees() {
        try {
            const response = await http.get('employees');
            setAllEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const employeesData: DataType[] = allEmployees.map((c: ShowEmployees) => {
        let date = new Date(c.birth).toLocaleDateString('pt-BR');
        return {
            key: UUID(),
            id: c.id,
            name: c.name,
            cpf: c.cpf,
            email: c.email,
            phone: c.phone,
            birth: date,
            status: c.status ? 'Ativo' : 'Inativo',
        };
    });

    const activeEmployeesData: DataType[] = employeesData.filter(
        (c: DataType) => c.status === 'Ativo'
    );

    useEffect(() => {
        getAllEmployees();
    }, []);

    return (
        <PageContainer>
            <Title>Funcionários</Title>
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

            <EmployeeData
                data={onlyActive ? activeEmployeesData : employeesData}
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
                    onClick={() => navigate('/register-employee')}
                >
                    <PlusIcon size={20} />
                    Novo
                </MyButton>
            </div>
        </PageContainer>
    );
}

function EmployeeData({ data }: { data: DataType[] }) {
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
            const response = await http.delete(`employees/${id}`);
            console.log('handleDelete: ', response.data);
            message.success('Funcionário removido com sucesso!');
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }

    async function handleStatus(id: string) {
        try {
            await http.put('employees', {
                id: id,
                status: true,
            });
            message.success('Funcionário ativado com sucesso!');
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
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            width: '30%',
            ...getColumnSearchProps('cpf'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Contato',
            dataIndex: 'phone',
            key: 'phone',
            width: '15%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Nascimento',
            dataIndex: 'birth',
            key: 'birth',
            width: '15%',
            ...getColumnSearchProps('birth'),
            sorter: (a, b) =>
                Number(a.birth.slice(0, 2)) - Number(b.birth.slice(0, 2)),
            sortDirections: ['descend', 'ascend'],
        },
        {
            className: 'hidden sm:inline-flex',
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '5%',
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
                                onClick={() => {
                                    console.log('RECORD', record);
                                    navigate(
                                        `/infos-employee/edit/${record.id}`
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
            title='Excluir funcionário?'
            placement='left'
            description='Tem certeza que deseja exlcuir este funcionário?'
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
            title='Ativar funcionário?'
            placement='left'
            description='Deseja reativar este funcionário?'
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
