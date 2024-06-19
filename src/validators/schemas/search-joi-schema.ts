import Joi from 'joi';

export const createSearchBodyValidatorSchema = Joi.object().keys({
    searchQuery: Joi.string().required(),
    offset: Joi.number().required(),
})

export const baseSearchValidatorSchema = Joi.object().keys({
    searchQuery: Joi.string().required(),
    totalDocuments: Joi.number().required(),
})

export const loginBodyValidatorSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})

export const refreshValidatorSchema = Joi.object().keys({
    refreshToken: Joi.string().required(),
})

export const updateSearchValidatorSchema = baseSearchValidatorSchema.keys({
    _id: Joi.string().allow(null),
    createdBy: Joi.string().allow(null),
})
