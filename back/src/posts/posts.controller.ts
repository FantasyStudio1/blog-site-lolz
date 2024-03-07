import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateCommentDto, CreatePostDto, EditPostDto } from "./posts.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("/")
  getPosts(@Query("page") page: number) {
    return this.postsService.getPostsWithPagination(+page);
  }

  @Get("/single")
  getPost(@Query("id") id: string) {
    return this.postsService.getPost(+id);
  }

  @Get("/all")
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Post("/comment")
  createComment(@Body() dto: CreateCommentDto) {
    return this.postsService.addComment(dto);
  }

  @UseGuards(AuthGuard)
  @Post("/create")
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @UseGuards(AuthGuard)
  @Delete("/delete")
  deletePost(@Query("id") id: string) {
    return this.postsService.deletePost(+id);
  }

  @UseGuards(AuthGuard)
  @Put("/edit")
  editPost(@Body() dto: EditPostDto) {
    return this.postsService.editPost(dto);
  }
}
