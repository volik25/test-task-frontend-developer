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
    Client = '0',
    Partner = '1',
    Admin = '2'
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

export const headers: string[] = [
    'Email',
    'Пароль',
    'Телефон',
    'Фамилия',
    'Имя',
    'Отчество',
    'Статус',
    'Дата создания записи',
    'Дата последнего редактирования'
]

export interface Alert {
  type: string;
  message: string;
}