import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new BadRequestException("Wrong Email or Password");
    }

    const isRightPass = await bcrypt.compareSync(dto.password, user.password);

    if (!isRightPass) {
      throw new BadRequestException("Wrong Email or Password");
    }

    return {
      accessToken: await this.jwtService.signAsync({
        email: dto.email,
        isAdmin: user.isAdmin,
      }),
    };
  }
}
