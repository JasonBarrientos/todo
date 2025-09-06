import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class CreateUserResponseDto extends PartialType(CreateUserDto) {
    readonly token:string
}
