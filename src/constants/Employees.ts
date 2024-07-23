import { z } from 'zod';

export type EmployeeEntity = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birth: string;
    ativo: boolean;
};

export class EmployeeDto {
    readonly id?: string;
    readonly name: string;
    readonly cpf: string;
    readonly email: string;
    readonly phone: string;
    readonly birth: string;
    readonly ativo: boolean;

    constructor(data: EmployeeEntity) {
        this.id = data.id || 'ID not provided.';
        this.name = data.name;
        this.cpf = data.cpf;
        this.email = data.email;
        this.phone = data.phone;
        this.birth = data.birth;
        this.ativo = data.ativo;
    }
}

export const createEmployeeFormSchema = z.object({
    name: z
        .string({
            required_error: 'Nome obrigatório!',
        })
        .min(4, 'Mínimo de 4 caracteres!')
        .regex(/^[A-Za-z\s]+$/, 'Apenas letras!'),
    cpf: z
        .string({
            required_error: 'CPF obrigatório!',
        })
        .min(11, 'CPF inválido!')
        .max(11, 'Máximo de 11 caracteres!')
        .regex(/^\d{11}$/, 'Apenas números!'),
    email: z
        .string({
            required_error: 'Email obrigatório!',
        })
        .email({
            message: 'Email inválido!',
        }),
    phone: z
        .string({
            required_error: 'Celular obrigatório!',
        })
        .min(11, 'Celular inválido!')
        .regex(/^\d+$/, 'Apenas números!'),
    birth: z
        .string({
            required_error: 'Nascimento obrigatório!',
        })
        .min(1, 'Nascimento é obrigatório!'),
});
