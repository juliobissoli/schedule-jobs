import * as Joi from 'joi';


export class CreateCollaboratorDto {
    name: string;
    email: string;
    phone: string;
}


export const CreateCollaboratorDtoValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
  });