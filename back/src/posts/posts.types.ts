export interface CreateCommentDto {
  postId: number;
  author: string;
  text: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  content: string;
}

export interface EditPostDto {
  id: number;
  title: string;
  description: string;
  content: string;
}
