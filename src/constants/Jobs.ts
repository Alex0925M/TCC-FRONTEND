import { z } from 'zod';
import { ClientDto } from './Clients';

// Define o tipo para EmployeDto
export type EmployeeDto = {
    id: string;
    name: string;
};

// Define o tipo para InternDto
export type InternDto = {
    id: string;
    name: string;
};

export type CompanyDto ={
 id:string;
 name:string;
};

// Define o tipo para JobEntity
export type JobEntity = {
    id: string;
    serviceType: string;
    employe?: EmployeeDto; // Employe pode ser opcional
    intern?: InternDto;   // Intern pode ser opcional
    companies?: string[]; // IDs das empresas
    clients?: string[];   // IDs dos clientes
    active: boolean;
};

// Define a classe JobDto
export class JobDto {
    readonly id?: string;
    readonly serviceType: string;
    readonly employe?: EmployeeDto; // Inclui employee
    readonly intern?: InternDto;   // Inclui intern
    readonly companies?: string[]; // IDs das empresas
    readonly clients?: string[];   // IDs dos clientes
    readonly active: boolean;

    constructor(data: JobEntity) {
        this.id = data.id;
        this.serviceType = data.serviceType;
        this.employe = data.employe;
        this.intern = data.intern;
        this.companies = data.companies;
        this.clients = data.clients;
        this.active = data.active;
    }
}

// Define o esquema para criação de um Job
export const createJobFormSchema = z.object({
    serviceType: z.string().min(1, { message: "Service type is required." }), // ServiceType é obrigatório e não pode ser vazio
    employe: z.object({
        id: z.string(),
        name: z.string(),
    }).optional(), // Employe é opcional
    intern: z.object({
        id: z.string(),
        name: z.string(),
    }).optional(), // Intern é opcional
    companies: z.array(z.string()).optional(), // IDs das empresas
    clients: z.array(z.string()).optional(),   // IDs dos clientes
    active: z.boolean(), // Active deve ser um booleano
});
