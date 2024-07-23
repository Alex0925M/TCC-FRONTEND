import { z } from 'zod';

type Adress = {
    zipcode: string;
    city: string;
    street: string;
    number: string;
    district: string;
};

export type ClientEntity = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birth: string;
    adress: Adress;
};

export class ClientDto {
    readonly id?: string;
    readonly name: string;
    readonly cpf: string;
    readonly email: string;
    readonly phone: string;
    readonly birth: string;
    readonly adress: Adress;

    constructor(data: ClientEntity) {
        this.id = data.id || 'ID not provided.';
        this.name = data.name;
        this.cpf = data.cpf;
        this.email = data.email;
        this.phone = data.phone;
        this.birth = data.birth;
        this.adress = data.adress;
    }
}

export const createClientFormSchema = z.object({
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
    city: z
        .string({
            required_error: 'Cidade obrigatória!',
        })
        .min(4, 'Mínimo de 4 caracteres!')
        .regex(/^[A-Za-z\s]+$/, 'Apenas letras!'),
    street: z
        .string({
            required_error: 'Rua obrigatória!',
        })
        .min(4, 'Mínimo de 4 caracteres!')
        .regex(/^[A-Za-z\s]+$/, 'Apenas letras!'),
    district: z
        .string({
            required_error: 'Bairro obrigatório!',
        })
        .min(4, 'Mínimo de 4 caracteres!')
        .regex(/^[A-Za-z\s]+$/, 'Apenas letras!'),
    zipcode: z
        .string({
            required_error: 'CEP obrigatório!',
        })
        .min(8, 'CEP inválido!')
        .max(9, 'CEP inválido!'),
    number: z
        .string({
            required_error: 'Número obrigatório!',
        })
        .min(1, 'Número inválido!')
        .regex(/^\d+$/, 'Apenas números!'),
});
