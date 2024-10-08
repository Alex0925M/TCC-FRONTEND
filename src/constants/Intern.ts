import { z } from 'zod';

export type InternEntity = {
    id:string;
    email:string;
    name: string;
    cpf:string;
    ativo:boolean;
};

export class InternDto{
    readonly id?: string;
    readonly email:string;
    readonly name:string;
    readonly cpf:string;
    readonly ativo:boolean;

    constructor(data: InternEntity){
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.cpf = data.cpf;
        this.ativo = data.ativo;
    }
}

export const createInternFormSchema = z.object({
    id: z.string().optional(),
    email: z.string().email("Email inválido"),  // Verifica se o e-mail é válido
    name: z.string().min(1, "Nome é obrigatório"),  // Nome não pode estar vazio
    cpf: z.string().length(11, "CPF deve ter 11 caracteres"),  // Supondo que o CPF tenha exatamente 11 caracteres
    ativo: z.boolean()  // Campo booleano para indicar se está ativo
});

export type CreateInternFormData = z.infer<typeof createInternFormSchema>;
