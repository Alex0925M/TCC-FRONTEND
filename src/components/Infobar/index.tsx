import { Bell, Settings } from 'lucide-react';
import seLogo from '../../assets/images/logo_sebraeaqui.png';
import AntdDropdown from '../AntDesign/AntdDropdown';

export function Infobar() {
    return (
        <nav className='fixed top-0 flex items-center justify-between w-full min-h-[70px] max-h-[70px] bg-blue-primary pl-9 pr-6 font-semibold text-white z-50'>
            <div className='flex items-center gap-1 md:gap-6 lg:gap-28'>
                <img
                    className='hidden md:inline-flex w-[150px] h-[60px] select-none'
                    src={seLogo}
                    alt='SEBRAE AQUI Logo'
                    draggable='false'
                />

                <p className='text-md truncate max-w-[200px] md:text-lg mr-4'>
                    Rubens da Cunha Junior
                </p>
            </div>

            <div className='flex items-center justify-center gap-4 md:gap-12 select-none'>
                <Bell className='w-[30px] h-[30px] hover:cursor-pointer' />
                
                <div className='flex items-center gap-2 hover:cursor-pointer'>
                    <p className='hidden lg:inline-flex'>Configurações</p>
                    <Settings className='w-[30px] h-[30px]' />
                </div>

                <div className='flex items-center justify-center lg:gap-2 hover:cursor-pointer'>
                    <AntdDropdown title='Menu' />
                </div>
            </div>
        </nav>
    );
}
