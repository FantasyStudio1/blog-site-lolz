import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { User } from "./auth.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.cookies["token"];

    if (!token) throw new UnauthorizedException();

    const user = this.jwtService.decode(token) as User;

    if (user === null) throw new UnauthorizedException();

    if (!user.isAdmin) throw new ForbiddenException();

    return true;
  }
}
