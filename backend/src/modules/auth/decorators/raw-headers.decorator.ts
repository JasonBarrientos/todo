import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RawHeaders = createParamDecorator((data, ctx: ExecutionContext)=>{

    let req= ctx.switchToHttp().getRequest()
    let headers= req.rawHeaders
    return (!data)?headers: headers[data]
})