import { twMerge } from "tailwind-merge";

export function Button({
    children,
    className,
    onClick,
    variant='primary',
    type='button'
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    variant?: 'primary' | 'secondary';
    type?: "button" | "submit" | "reset" | undefined;
}) {
    return (
        <button 
            className={twMerge(
                'capitalize font-semibold text-white text-lg border-0 rounded-[6px] outline-none focus:outline-none w-full transition-colors',
                variant === 'primary' ? 
                    'bg-blue-secondary hover:bg-blue-primary'
                : 'border-[3px] -m-3 border-blue-primary text-blue-primary hover:border-blue-secondary hover:text-blue-secondary',
                className
            )}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
