import { Select, Space } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export type SelectOption = {
    value: string | number;
    label: string;
};

const AntdSelect = ({
    options,
    handleChange,
    size = 'large',
}: {
    options: SelectOption[] | any;
    handleChange: (value: any) => any;
    size?: SizeType;
}) => {

    return (
        <Space wrap>
            <Select
                size={size}
                defaultValue='6'
                style={{ width: 120 }}
                onChange={(event: any) => handleChange(event)}
                options={options}
            />
        </Space>
    );
};

export default AntdSelect;
