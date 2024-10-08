import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Table, Button, Input, Space, message, Dropdown, Menu, Popconfirm, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { v4 as UUID } from 'uuid';
import { PageContainer } from '../../../components/PageContainer';
import { Title } from '../../../components/Title';
import { http } from '../../../service/http';
import { Edit, Trash2, PlusIcon, ArrowLeft } from 'lucide-react';
import { JobEntity } from '../../../constants/Jobs';
import { ColumnsType, ColumnType, FilterConfirmProps } from 'antd/es/table/interface';

// Define o tipo para os dados da tabela
interface JobDataType {
    key: string;
    id: string;
    serviceType: string;
    employeName: string;
    internName: string;
    active: string;
}

export function JobsInfosPage() {
    const [allJobs, setAllJobs] = useState<JobEntity[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const navigate = useNavigate();

    async function getAllJobs() {
        try {
            const response = await http.get('authenticated/jobs');
            setAllJobs(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const jobsData: JobDataType[] = allJobs.map((job: JobEntity) => ({
        key: UUID(),
        id: job.id,
        serviceType: job.serviceType,
        employeName: job.employe ? job.employe.name : 'N/A',
        internName: job.intern ? job.intern.name : 'N/A',
        active: job.active ? 'Ativo' : 'Inativo',
    }));

    const activeJobsData: JobDataType[] = jobsData.filter(
        (job: JobDataType) => job.active === 'Ativo'
    );

    useEffect(() => {
        getAllJobs();
    }, []);

    return (
        <PageContainer>
            <Title>Jobs</Title>
            <div className='flex items-center justify-between w-[280px]'>
                <Button
                    onClick={() => {
                        setOnlyActive(!onlyActive);
                    }}
                >
                    {onlyActive ? 'Todos' : 'Apenas ativos'}
                </Button>

                <Button
                    className='flex items-center gap-2'
                    onClick={() => location.reload()}
                >
                    Recarregar
                </Button>
            </div>

            <JobData
                data={onlyActive ? activeJobsData : jobsData}
            />

            <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-10 sm:gap-28'>
                <Button
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} />
                    Voltar
                </Button>

                <Button
                    className='flex items-center gap-2 w-fit px-4 py-1.5'
                    onClick={() => navigate('/register-job')}
                >
                    <PlusIcon size={20} />
                    Novo
                </Button>
            </div>
        </PageContainer>
    );
}

function JobData({ data }: { data: JobDataType[] }) {
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
            await http.delete(`authenticated/jobs/${id}`);
            message.success('Job removido com sucesso!');
        } catch (error) {
            console.error(error);
            message.error('Algo deu errado!');
        }
    }

    const getColumnSearchProps = (
        dataIndex: keyof JobDataType
    ): ColumnType<JobDataType> => ({
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

    const columns: ColumnsType<JobDataType> = [
        {
            title: 'Tipo de Serviço',
            dataIndex: 'serviceType',
            key: 'serviceType',
            width: '20%',
            ...getColumnSearchProps('serviceType'),
        },
        {
            title: 'Funcionário',
            dataIndex: 'employeName',
            key: 'employeName',
            width: '20%',
            ...getColumnSearchProps('employeName'),
        },
        {
            title: 'Estagiário',
            dataIndex: 'internName',
            key: 'internName',
            width: '20%',
            ...getColumnSearchProps('internName'),
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            width: '10%',
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
            width: '10%',
            render: (_, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Button
                                className='flex items-center justify-center gap-2 w-full capitalize font-semibold'
                                onClick={() => navigate(`/infos-job/edit/${record.id}`)}
                            >
                                <Edit size={18} />
                                Editar
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <DeletePopup onDelete={() => handleDelete(record.id)} />
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
            title='Excluir job?'
            placement='left'
            description='Tem certeza que deseja excluir este job?'
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