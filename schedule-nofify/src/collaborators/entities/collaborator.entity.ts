import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type CollaboratorDocument = HydratedDocument<Collaborator>;

@Schema()
export class Collaborator extends Document {

    @ApiProperty({ example: 'João', description: 'Nome do colaborador' })
    @Prop()
    name: string;

    @ApiProperty({ example: 'joao@example.com', description: 'Email do colaborador' })
    @Prop()
    email: string;

    @ApiProperty({ example: '(11) 91234-5678', description: 'Telefone do colaborador' })
    @Prop()
    phone: string;

    @ApiProperty({ example: 'Ativo', description: 'Status do colaborador' })
    @Prop()
    status: string;

    @ApiProperty({ example: 0, description: 'Total de trabalhos do colaborador' })
    @Prop({ default: 0 })
    totalJobs: number;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Data de criação' })
    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Data da última atualização' })
    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;
}


export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);



