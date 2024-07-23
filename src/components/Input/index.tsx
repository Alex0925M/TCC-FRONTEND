import { twMerge } from 'tailwind-merge';
import { InputStyle } from '../../constants/Input';
import { Controller } from 'react-hook-form';

type InputComponentProps = Partial<HTMLInputElement> & {
    control: any;
    errors: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    labelStyle?: string;
    autoComplete?: string;
};

export const Input: React.FC<InputComponentProps> = ({
    control,
    errors,
    name,
    label,
    placeholder = '',
    type,
    labelStyle = '',
    autoComplete = '',
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className='flex flex-col justify-center xl:items-center'>
                    <div className='flex flex-col justify-center'>
                        <label
                            htmlFor={name}
                            className={twMerge(
                                'select-none font-semibold text-lg capitalize',
                                labelStyle
                            )}
                        >
                            {label}
                            <span className={'text-red-400'}>*</span>
                        </label>

                        <input
                            {...field}
                            id={name}
                            name={name}
                            className={InputStyle}
                            placeholder={placeholder}
                            type={type}
                            autoComplete={autoComplete}
                        />

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
};
