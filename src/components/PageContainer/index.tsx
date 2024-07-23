export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <section className='flex flex-col justify-start items-stretch lg:gap-6 pt-[74px] px-4 lg:px-8 pb-6 lg:pb-16 w-full bg-white-primary'>
            {children}
        </section>
    );
}
