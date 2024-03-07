import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSWRConfig } from 'swr'

import { apiDomain } from '@/lib/constants'
import { deletePostAction } from '@/lib/data/actions'
import { IPostItem } from '@/lib/types'

interface PostItemProps {
  post: IPostItem
  pageQuery: string
  editable?: boolean
}

export function PostItem({ post, editable = false, pageQuery }: PostItemProps) {
  if (editable) {
    return (
      <div className='relative border border-solid border-[rgba(0,0,0,.114)] p-3 rounded-md shadow-sm'>
        <Link
          href={`/post/${post.id}`}
          className='font-medium text-base transition-shadow rounded-sm'
        >
          {post.title}
        </Link>
        <div className='text-sm line-clamp-1 has-[+div]:mb-3'>{post.description}</div>
        {post.comments.length ? <div className='text-xs'>Есть комментарии</div> : null}
        <div className='absolute right-3 bottom-3 flex align-middle gap-2'>
          <DeleteForm id={post.id} query={pageQuery} />
          <Link
            className='inline-flex rounded-sm text-blue-500 transition-shadow'
            aria-label='Редактировать пост'
            href={`/admin/edit/${post.id}`}
          >
            <EditIcon />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/post/${post.id}`}
      className='border border-solid border-[rgba(0,0,0,.114)] p-3 rounded-md shadow-sm hover:shadow transition-shadow'
    >
      <div className='font-medium text-base'>{post.title}</div>
      <div className='text-sm line-clamp-1 has-[+div]:mb-3'>{post.description}</div>
      {post.comments.length ? <div className='text-xs'>Есть комментарии</div> : null}
    </Link>
  )
}

function DeleteForm({ id, query }: { id: string; query: string }) {
  const [state, formAction] = useFormState(deletePostAction, null)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (state) {
      if (state.success) {
        mutate(`${apiDomain}/posts?page=${query}`)
      }
    }
  }, [state, mutate, query])

  return (
    <form className='inline-flex' action={e => formAction(e)}>
      <SubmitButton />
      <input type='hidden' value={id} name='postId' />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className='inline-flex text-red-500 transition-shadow rounded-sm'
      type='submit'
      aria-label='Удалить пост'
      disabled={pending}
    >
      {!pending ? (
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
            fill='currentColor'
            fillRule='evenodd'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          version='1.1'
          viewBox='0 0 16 16'
          width='15'
          height='15'
          className='animate-spin'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M8 16c-2.137 0-4.146-0.832-5.657-2.343s-2.343-3.52-2.343-5.657c0-1.513 0.425-2.986 1.228-4.261 0.781-1.239 1.885-2.24 3.193-2.895l0.672 1.341c-1.063 0.533-1.961 1.347-2.596 2.354-0.652 1.034-0.997 2.231-0.997 3.461 0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-0.345-2.426-0.997-3.461-0.635-1.008-1.533-1.822-2.596-2.354l0.672-1.341c1.308 0.655 2.412 1.656 3.193 2.895 0.803 1.274 1.228 2.748 1.228 4.261 0 2.137-0.832 4.146-2.343 5.657s-3.52 2.343-5.657 2.343z'></path>
        </svg>
      )}
    </button>
  )
}

function EditIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}
