import Joi from 'joi';
import { updateSearchValidatorSchema } from './search-joi-schema';

export const createOrUpdateManySavedSearchValidatorSchema = Joi.object().keys({
    savedSearches: Joi.array().items(
        updateSearchValidatorSchema
    )
})
