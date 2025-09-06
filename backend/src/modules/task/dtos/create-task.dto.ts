import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsIn, IsInt, IsOptional, IsString, MinLength } from "class-validator";

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
        priority:number;

        @ApiProperty()
        @IsOptional()
        @IsDate()
        due_date? : Date

}
