import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SidebarItem({
    icon: Icon,
    text,
    to
}: {
    icon: LucideIcon;
    text: string;
    to: string;
}) {
    return (
        <Link to={to} className='flex items-center gap-1 px-4 w-full h-[40px] hover:bg-blue-primary hover:cursor-pointer duration-100'>
            <Icon />
            <p className='hidden xl:inline-flex'>
                {text}
            </p>
        </Link>
    );
};
