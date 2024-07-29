import sebLogo from '../../assets/images/logo_sebraeaqui.png';
import { z } from 'zod';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginPage() {
    const loginUserFormSchema = z.object({
        email: z
            .string({
                required_error: 'Email obrigatório!',
            })
            .email({
                message: 'Email inválido!',
            }),
        password: z
            .string({
                required_error: 'Senha obrigatória!',
            })
            .min(1, 'Senha obrigatória!'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginUserFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();

    async function onSubmit(event: any) {
        try {
            /**@todo Implementar login */
            console.log('Enviado! ', event);
            navigate('/');
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    return (
        <section className='w-screen h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-8 px-10 py-8 items-center justify-center bg-black/50 w-[400px] h-[450px] rounded-[6px]'>
                <img
                    src={sebLogo}
                    alt='SEBRAE AQUI Logo'
                    className='select-none'
                    draggable='false'
                />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-4 justify-center'
                >
                    <Input
                        name='email'
                        control={control}
                        placeholder='email@example.com'
                        type='email'
                        label='Usuário'
                        labelStyle='text-white'
                        autoComplete='email'
                        errors={errors.email}
                    />
                    <Input
                        name='password'
                        control={control}
                        placeholder='*****'
                        type='password'
                        label='Senha'
                        labelStyle='text-white'
                        autoComplete='off'
                        errors={errors.password}
                    />
                    <Button
                        className='w-[270px] py-2 text-white text-lg font-semibold'
                        type='submit'
                    >
                        Entrar
                    </Button>
                </form>
            </div>
            <div className='absolute bg-blue-secondary/90 h-screen w-[50%] left-0 -z-40' />
            <div className='absolute bg-blue-background h-screen w-[50%] right-0 -z-40' />
            <div className='absolute text-center bottom-1 text-white'>
                <p>
                    Desenvolvido por{'Alex Dos Santos Moreira'}
                    <span className='underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                        Logic Flare
                    </span>
                </p>

                <p>
                    SEBRAE AQUI ASSIS -{' '}
                    <span className='cursor-pointer'>
                        Todos os direitos reservados.
                    </span>
                </p>
            </div>
        </section>
    );
}
