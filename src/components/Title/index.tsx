export function Title({ children }: { children: React.ReactNode }) {
    return (
        <h1 className='w-full border-b-[3px] pb-2 text-black sm:text-xl lg:text-3xl capitalize font-bold'>
            {children}
        </h1>
    );
}
