import { PartialType } from '@nestjs/mapped-types';
import { CreateRakiumClientDto } from './create-rakium-client.dto';

export class UpdateRakiumClientDto extends PartialType(CreateRakiumClientDto) {} 