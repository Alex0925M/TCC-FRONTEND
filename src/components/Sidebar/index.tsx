import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { BarChart2,  Home, MessageCircle, Shield, User } from 'lucide-react';

export function Sidebar() {
    const whatsappNumber = "5518997254605"; 
    const defaultMessage = "Olá, preciso de suporte com a plataforma."; // Mensagem padrão

    const handleSupportClick = () => {
        const messageEncoded = encodeURIComponent(defaultMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${messageEncoded}`, "_blank");
    };

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
                <SidebarItem
                    icon={BarChart2}
                    text='Relatórios'
                    to="/graph-info"
                />     
                <div onClick={handleSupportClick} className="flex items-center cursor-pointer">
                    <MessageCircle className="ml-4" />
                    <span className="ml-2">Suporte</span>
                </div>
            </SidebarSection>
        </nav>
    );
}
