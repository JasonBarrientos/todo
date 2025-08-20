import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsIn, IsInt, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateTaskDto {
        @ApiProperty()
        @IsString()
        @MinLength(5)
        title:string;

        @ApiProperty()
        @IsOptional()
        @IsString()
        description?:string;

        @ApiProperty()
        @IsInt()
        @IsIn([1,2,3])
        priority:string;

        @ApiProperty()
        @IsOptional()
        @IsDate()
        due_date? : Date
}
