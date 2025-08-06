import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, MinLength } from "class-validator";
import { Task } from "src/task/entities/task.entity";


export class CreateUserDto {
    @ApiProperty({type: 'string', minLength: 4,example:"jason",required:true})
    @IsString()
    @MinLength(4)
    name: string;

    @ApiProperty({type: 'string', minLength: 4,example:"jason@email.com",required:true})
    @IsString()
    @MinLength(4)
    email: string;

    @ApiProperty({type: 'string', minLength: 4,required:true, example:"mipassw_123!"})
    @IsString()
    @MinLength(4)
    password: string;

    // @ApiProperty({ required:false, type: [Task] ,description:'Array de tareas', example:[ {
    //     "title": "limpiar piso",
    //     "description": "limpiar asala comdor",
    //     "priority":2
    // }], default:[]})
    // @IsOptional()
    // @IsArray()
    // tasks?: Task[];
}
