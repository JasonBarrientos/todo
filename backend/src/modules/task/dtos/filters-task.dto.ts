import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional } from "class-validator";

export class FilterTaskDto {
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    priority?: number

    @IsOptional()
    @IsBoolean()
    @Type(()=>Boolean)
    is_done?: boolean;

    @IsOptional()
    @IsDate()
    due_date?: Date
}