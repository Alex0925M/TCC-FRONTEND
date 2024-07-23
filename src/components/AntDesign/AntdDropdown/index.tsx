import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { LogOut, MoreVertical, UserCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const itemsDefault: MenuProps['items'] = [
    {
        label: <p className='capitalize'>Perfil</p>,
        key: '0',
        icon: <UserCircle />,
    },
    {
        label: <p className='capitalize'>Sair</p>,
        key: '1',
        icon: <LogOut />,
    },
];

const AntdDropdown = ({
    title,
    options,
    className,
}: {
    title: string;
    options?: MenuProps['items'];
    className?: string;
}) => {
    const items = !options ? itemsDefault : options;
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a
                className={twMerge(
                    'text-white hover:text-white-primary',
                    className
                )}
                onClick={(e) => e.preventDefault()}
            >
                <Space>
                    <p className='hidden lg:inline-flex'>{title}</p>
                    <MoreVertical />
                </Space>
            </a>
        </Dropdown>
    );
};

export default AntdDropdown;
