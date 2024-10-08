import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { LogOut, MoreVertical, UserCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';

// Define o componente AntdDropdown
const AntdDropdown = ({
    title,
    className,
}: {
    title: string;
    options?: MenuProps['items'];
    className?: string;
}) => {
    const navigate = useNavigate(); // Inicializa a função de navegação

    // Define os itens do menu, incluindo o item de logout com navegação
    const items: MenuProps['items'] = [
        {
            label: <p className='capitalize'>Perfil</p>,
            key: '0',
            icon: <UserCircle />,
        },
        {
            label: <p className='capitalize'>Sair</p>,
            key: '1',
            icon: <LogOut />,
            onClick: () => {
                navigate('/login'); // Usa a função navigate para redirecionamento
            }
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a
                className={twMerge(
                    'text-white hover:text-white-primary',
                    className
                )}
                onClick={(e) => e.preventDefault()} // Previne o comportamento padrão do link
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
