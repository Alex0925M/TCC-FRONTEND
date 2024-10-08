import { Table } from 'antd';
import { CompanyDto } from '../../../constants/Companies';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';

export interface DataType {
    key: string;
    id?: string | undefined;
    cnpj: string;
    companyName: string;
    qualifications: string;
    segment: string;
    active: boolean;
}

interface TableProps {
    dataSource: DataType[];
    pagination?: false | TablePaginationConfig | undefined;
    companyRelation: (value: any) => void;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
        render: (text) => <strong>{text}</strong>,
    },
    {
        title: 'Nome Fantasia',
        dataIndex: 'companyName',
        key: 'companyName',
        render: (text) => <strong>{text}</strong>,
    },
    {
        title: 'Qualificação',
        dataIndex: 'qualifications',
        key: 'qualifications',
        render: (text) => <strong>{text}</strong>,
    },
    {
        title: 'Segmento',
        dataIndex: 'segment',
        key: 'segment',
        render: (text) => <strong>{text}</strong>,
    },
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (text: boolean) => (
            <strong>{text ? 'ATIVO' : 'INATIVO'}</strong>
        ),
    },
];

const AntdTable = ({ dataSource, pagination, companyRelation }: TableProps) => {
    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: CompanyDto[]
        ) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            companyRelation(selectedRows);
        },
    };

    return (
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
        />
    );
};

export default AntdTable;

