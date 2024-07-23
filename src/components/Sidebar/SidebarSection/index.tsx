export function SidebarSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col gap-1 w-full'>
            <h2 className='uppercase text-xl px-2 hidden xl:inline-flex'>{title}</h2>

            <div className='flex flex-col gap-2 w-full'>{children}</div>
        </div>
    );
}
