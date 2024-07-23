import { twMerge } from 'tailwind-merge';

export function FormBox({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: string;
}) {
    return (
        <div
            className={twMerge(
                'grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xl:w-full md:w-fit',
                style
            )}
        >
            {children}
        </div>
    );
}
