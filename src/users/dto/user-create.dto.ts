import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class UserCreateDTO {

    @IsEmail(undefined, {message: 'Некорректный email'})
    email: string;

    @Length(4, 16, {message: 'Пароль должен быть от 4 до 16 символов'})
    password: string;
    
    isVerified?: boolean;
    role: string[];
    createdAt?: Date;
    updatedAt?: Date;
    history?: any[];
    favorites?: string[];

    
}