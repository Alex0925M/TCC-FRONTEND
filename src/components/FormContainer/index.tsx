import { twMerge } from 'tailwind-merge';

export function FormContainer({
    title,
    children,
    style,
}: {
    title: string;
    children: React.ReactNode;
    style?: string;
}) {
    return (
        <div
            className={twMerge(
                'flex flex-col items-start justify-center',
                style
            )}
        >
            <h2 className='text-gray-400 uppercase text-2xl font-semibold'>
                {title}
            </h2>

            <div className='flex flex-col items-center justify-center gap-4 w-full border-2 border-gray-400 rounded-[6px] px-4 lg:px-8 py-4'>
                {children}
            </div>
        </div>
    );
}
