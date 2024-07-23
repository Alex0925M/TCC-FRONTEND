import { Input } from 'antd';
import { twMerge } from 'tailwind-merge';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { LucideIcon } from 'lucide-react';
import React from 'react';

const AntdInput = React.forwardRef<any, any>(
    (
        {
            icon: Icon,
            placeholder,
            size = 'large',
            type = 'text',
            className,
            defaultValue = '',
            name,
        }: {
            icon?: LucideIcon | any;
            placeholder?: string;
            size?: SizeType;
            type?: string;
            className?: string;
            defaultValue?: any;
            name?: string;
        },
        ref
    ) => (
        <Input
            size={size}
            type={type}
            placeholder={placeholder}
            name={name?.toLowerCase()}
            prefix={Icon ? <Icon /> : <></>}
            defaultValue={defaultValue}
            className={twMerge(
                'border-2 border-black hover:border-blue-primary focus:border-blue-secondary rounded-[6px] w-[270px]',
                className
            )}
            ref={ref}
        />
    )
);

export default AntdInput;
