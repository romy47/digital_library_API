import Joi from 'joi';
import { IUserInput } from '../../models/user';

export const signupBodyValidatorSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
})

interface ILoginInput extends Omit<IUserInput, 'firstname' | 'lastname'> { }

export const loginBodyValidatorSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})

export const refreshValidatorSchema = Joi.object().keys({
    refreshToken: Joi.string().required(),
})

