export type User = {
  email: string | null
  isAdmin: boolean
}

export interface IPostItem {
  id: string
  title: string
  description: string
  content: string
  comments: IComment[]
}

export interface IComment {
  id: string
  author: string
  text: string
}
