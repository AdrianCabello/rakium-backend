import { PartialType } from '@nestjs/mapped-types';
import { CreateFinalUserDto } from './create-final-user.dto';

export class UpdateFinalUserDto extends PartialType(CreateFinalUserDto) {} 