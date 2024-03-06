import { Controller, Get, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";

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
}
