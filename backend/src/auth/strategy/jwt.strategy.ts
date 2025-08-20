import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
    constructor(  configService: ConfigService,@InjectRepository(User) private readonly userRepository:Repository<User>){
        super({
            secretOrKey: configService.get('JWT_SECRET')!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    
   async  validate(payload: JwtPayload): Promise<User> {
    const {email} = payload;
    let user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.email= :email',{email})
    .select(['user.isActive','user.password'])
    .getOne()
    if (!user)throw new UnauthorizedException(`Usuario no autorizado`)
    if(!user.isActive)throw new UnauthorizedException(`Usuario no activo`)
    
        
    return user;
    }

}