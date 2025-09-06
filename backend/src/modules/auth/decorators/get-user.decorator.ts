import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser= createParamDecorator((data, ctx: ExecutionContext)=>{
    let req = ctx.switchToHttp().getRequest();
    let user= req.user
    if (!user)  throw new InternalServerErrorException(`USER NOT FOUND IN REQUEST`)
    return (!data) ?user:user[data]
})