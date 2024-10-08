import { http } from '../../../../service/http';
import { Title } from '../../../../components/Title';
import { v4 as UUID } from 'uuid';
import { useNavigate } from 'react-router';
import { PageContainer } from '../../../../components/PageContainer';
import { SearchOutlined } from '@ant-design/icons';
import { Button as MyButtom } from '../../../../components/Button';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Popconfirm, Space, Table, message, Dropdown, Menu } from 'antd';
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

type ShowInterns = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    ativo: boolean;
};

interface DataType {
    key: string;
    id: string;
    name: string;
    cpf: string;
    email: string;
    ativo: string;
}

export function InternsInfosPage() {
    const [allInterns, setAllInterns] = useState<ShowInterns[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const navigate = useNavigate();

    async function getAllInterns() {
        try {
            const response = await http.get('authenticated/intern');
            setAllInterns(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const internsData: DataType[] = allInterns.map((c: ShowInterns) => {
        return {
            key: UUID(),
            id: c.id,
            name: c.name,
            cpf: c.cpf,
            email: c.email,
            ativo: c.ativo ? 'Ativo' : 'Inativo',
        };
    });

    const activeInternsData: DataType[] = internsData.filter(
        (c: DataType) => c.ativo === 'Ativo'
    );

    useEffect(() => {
        getAllInterns();
    }, []);

    return (
        <PageContainer>
            <Title>Estagiários</Title>
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

            <InternData
                data={onlyActive ? activeInternsData : internsData}
                refreshData={getAllInterns}
            />

            <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-10 sm:gap-28'>
                <MyButtom
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    variant='secondary'
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} />
                    Voltar
                </MyButtom>

                <MyButtom
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    onClick={() => navigate('/register-intern')}
                >
                    <PlusIcon size={20} />
                    Novo
                </MyButtom>
            </div>
        </PageContainer>
    );
}

function InternData({ data, refreshData }: { data: DataType[], refreshData: () => void }) {
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
            const response = await http.put(`authenticated/intern/${id}`, {
                ativo: false,
            });
            if (response.status === 200) {
                message.success('Estagiário desativado com sucesso!');
                await refreshData(); // Aguarde a atualização da lista de estagiários após a desativação
            } else {
                message.error('Falha ao desativar o estagiário!');
            }
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }
    
    async function handleStatus(id: string) {
        try {
            const response = await http.put(`authenticated/intern/${id}`, {
                ativo: true,
            });
            if (response.status === 200) {
                message.success('Estagiário ativado com sucesso!');
                await refreshData(); // Aguarde a atualização da lista de estagiários após a ativação
            } else {
                message.error('Falha ao ativar o estagiário!');
            }
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
            width: '30%',
            ...getColumnSearchProps('email'),
        },
        {
            className: 'hidden sm:inline-flex',
            title: 'Status',
            dataIndex: 'ativo',
            key: 'ativo',
            width: '10%',
            ...getColumnSearchProps('ativo'),
            render: (_, record) => (
                <strong
                    className={`${
                        record.ativo === 'Ativo'
                            ? 'text-blue-primary'
                            : 'text-blue-background'
                    } uppercase`}
                >
                    {record.ativo}
                </strong>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            width: '10%',
            render: (_, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Button
                                className='flex items-center justify-center gap-2 w-full capitalize font-semibold'
                                onClick={() => navigate(`/infos-intern/edit/${record.id}`)}
                            >
                                <Edit size={18} />
                                Editar
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="details">
                            <Button
                                className='flex items-center justify-center gap-2 w-full capitalize font-semibold'
                                onClick={() => navigate(`edit/${record.id}`)}
                            >
                                <Building2 size={18} />
                                Detalhes
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            {record.ativo === 'Ativo' ? (
                                <DeletePopup onDelete={() => handleDelete(record.id)} />
                            ) : (
                                <ActivePopup onActive={() => handleStatus(record.id)} />
                            )}
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button>
                            Ações
                        </Button>
                    </Dropdown>
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
            title='Desativar estagiário?'
            placement='left'
            description='Tem certeza que deseja desativar este estagiário?'
            okText='Desativar'
            okType='danger'
            cancelText='Voltar'
            onCancel={() => {}}
            onConfirm={onDelete}
        >
            <Button type='primary' danger>
                <Trash2 size={18} />
                Desativar
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
            title='Ativar estagiário?'
            placement='left'
            description='Deseja reativar este estagiário?'
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