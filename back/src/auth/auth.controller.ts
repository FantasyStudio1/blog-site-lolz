import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { LoginDto, User } from "./auth.types";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("/validate")
  validate(@Req() request: Request) {
    const cookie = request.cookies["token"];

    if (!cookie) {
      return {
        email: null,
      };
    }

    const user = this.jwtService.decode(cookie) as User;

    if (user === null) {
      return {
        email: null,
      };
    }

    return {
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
