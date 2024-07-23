import { twMerge } from 'tailwind-merge';
import { InputStyle } from './../../constants/Input';
import { Controller } from 'react-hook-form';

type SelectComponentProps = {
    control: any;
    errors: any;
    name: string;
    label: string;
    labelStyle?: string;
    children: React.ReactNode;
};

export function Select({
    control,
    errors,
    name,
    label,
    labelStyle,
    children,
}: SelectComponentProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center'>
                        <label
                            htmlFor={name}
                            className={twMerge(
                                'select-none font-semibold text-lg capitalize text-black',
                                labelStyle
                            )}
                        >
                            {label}
                            <span className={'text-red-400'}>*</span>
                        </label>

                        <select
                            {...field}
                            id={name}
                            name={name}
                            className={`py-0 h-[54px] ${InputStyle}`}
                        >
                            {children}
                        </select>

                        {errors && (
                            <p className='text-red-500'>
                                {String(errors.message)}
                            </p>
                        )}
                    </div>
                </div>
            )}
        />
    );
}
