import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreateCommentDto, CreatePostDto, EditPostDto } from "./posts.types";

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

  @Post("/create")
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Delete("/delete")
  deletePost(@Query("id") id: string) {
    return this.postsService.deletePost(+id);
  }

  @Put("/edit")
  editPost(@Body() dto: EditPostDto) {
    return this.postsService.editPost(dto);
  }
}
