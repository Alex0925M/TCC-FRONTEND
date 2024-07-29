import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { Home, Shield, User } from 'lucide-react';

export function Sidebar() {
    return (
        <nav className='flex flex-col gap-4 font-semibold text-lg items-start pt-[70px] pb-6 2xl:min-w-[260px] min-h-screen sm:w-[60px] xl:w-[220px] 2xl:w-[260px] text-white bg-blue-background select-none transition-all duration-200'>
            <SidebarSection title='Menu Principal'>
                <SidebarItem
                    icon={Home}
                    text='Home'
                    to='/'
                />
                <SidebarItem
                    icon={Shield}
                    text='Administrador'
                    to='/admin-panel'
                />
                <SidebarItem
                    icon={User}
                    text='Atendimento'
                    to="/registration-panel"
                />    
            </SidebarSection>
        </nav>
    )
};
