import { z } from 'zod';

export type CompanyEntity = {
    id: string;
    companyName: string;
    cnpj: string;
    qualifications: string;
    segment: string;
    dateOfCreation: string;
    active: boolean;
};

export enum CompanySegments {
    Administrativo = 'Administrativo',
    Contabilidade = 'Contabilidade',
    Tecnlogoia = 'Tecnologia',
}

export enum CompanyQualifications {
    Qualidade = 'Qualidade',
    Teste = 'Teste',
}

export class CompanyDto {
    readonly id?: string;
    readonly cnpj: string;
    readonly companyName: string;
    readonly qualifications: string;
    readonly segment: string;
    readonly active: boolean;

    constructor(data: CompanyEntity) {
        this.id = data.id || 'ID not provided.';
        this.cnpj = data.cnpj;
        this.companyName = data.companyName;
        this.qualifications = data.qualifications;
        this.segment = data.segment;
        this.active = data.active;
    }
}

export const createCompanyFormSchema = z.object({
    companyName: z
        .string({
            required_error: 'Nome obrigatório!',
        })
        .min(2, 'Mínimo de 2 caracteres!'),
    cnpj: z
        .string({
            required_error: 'CNPJ obrigatório!',
        })
        .min(14, 'CNPJ inválido!')
        .max(14, 'Máximo de 14 caracteres!')
        .regex(/^\d{14}$/, 'Apenas números!'),
    segment: z.nativeEnum(CompanySegments, {
        errorMap: (_issue, _ctx) => {
            return { message: 'Selecione um segmento!' };
        },
    }),
    qualifications: z.nativeEnum(CompanyQualifications, {
        errorMap: (_issue, _ctx) => {
            return { message: 'Selecione uma qualificação!' };
        },
    }),
});
