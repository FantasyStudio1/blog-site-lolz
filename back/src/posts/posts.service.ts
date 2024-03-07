import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCommentDto, CreatePostDto, EditPostDto } from "./posts.types";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async getPostsWithPagination(page: number) {
    const size = 5;

    return this.prisma.$transaction([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        skip: (page - 1) * size,
        take: size,
        include: {
          comments: true,
        },
      }),
    ]);
  }

  async getPost(id: number) {
    return this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });
  }

  async addComment(dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: dto,
    });
  }

  async createPost(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: dto,
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }

  async editPost(dto: EditPostDto) {
    return this.prisma.post.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        description: dto.description,
        content: dto.content,
      },
    });
  }
}
