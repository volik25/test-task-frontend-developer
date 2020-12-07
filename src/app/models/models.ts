export interface User {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    status: Statuses;
    createDate: Date;
    lastChangeDate: Date;
}

export enum Statuses {
    Client,
    Partner,
    Admin
}

interface EnumValues {
    type: Statuses,
    value: string
}

export const StatusValue: EnumValues[] = [
    {
        type: Statuses.Admin,
        value: 'Администратор'
    },
    {
        type: Statuses.Client,
        value: 'Клиент'
    },
    {
        type: Statuses.Partner,
        value: 'Партнер'
    }
]