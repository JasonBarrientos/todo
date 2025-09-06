import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty({type: 'string', minLength: 4,example:"jason",required:true})
    @IsString()
    @MinLength(4)
    name: string;

    @ApiProperty({type: 'string', minLength: 4,example:"jason@email.com",required:true})
    @IsString()
    @MinLength(4)
    email: string;

    @ApiProperty({type: 'string',minLength: 8,required:true, example:"Mipassw_123!"})
    @IsStrongPassword({minLength:8})
    @IsString()
    password: string;

    @ApiProperty({type: 'string', minLength: 4,required:true, example:"nicknamePro!"})
    @IsString()
    @MinLength(4)
    nickname: string;
}
