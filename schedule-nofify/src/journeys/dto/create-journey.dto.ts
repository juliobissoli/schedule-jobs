import { ActionsTrigger, IJourneyAction } from "../entities/journey.entity";
import * as Joi from 'joi';


export class CreateJourneyDto {
    name: string;
    description: string;
    actions: IJourneyAction[];
    isSequential: boolean
}


export const CreateJourneyDtoValidator = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('available', 'inactive').default('available'),
    isSequential: Joi.boolean().optional(),
    actions: Joi.array().items(
        Joi.object({
            payload: Joi.string().required(),
            delay: Joi.number().min(0).required(),
            mode: Joi.string().valid('sender', 'exec').required(),
            trigger: Joi.string().valid(...Object.values(ActionsTrigger)).required(),
            maxAttempts: Joi.number().min(1).default(3),
        })
    ).required(),
});