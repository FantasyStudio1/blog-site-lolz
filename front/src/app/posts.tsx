'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

import Pagination from '@/components/pagination'
import { PostItem } from '@/components/post-item'

import { apiDomain } from '@/lib/constants'
import { IPostItem } from '@/lib/types'

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

const fetcher = (...args: any) => fetch(args).then(res => res.json())

export function MainPosts() {
  const searchParams = useSearchParams()
  const pageToNumber = Number(searchParams.get('page'))
  const pageQuery = searchParams.get('page') ?? '1'

  // Там получается [totalCount, IPostItem[]]
  const { isLoading, data } = useSWR<any>(`${apiDomain}/posts?page=${pageQuery}`, fetcher, {})

  useIsomorphicLayoutEffect(() => {
    if (isNaN(pageToNumber)) {
      window.history.replaceState(null, '', '/')
    }
  }, [pageToNumber])

  return (
    <div>
      {isLoading ? (
        <div className='h-48 grid place-items-center'>
          <Spinner />
        </div>
      ) : data ? (
        <div className='flex flex-col gap-4'>
          {data.slice(1)[0].length ? (
            data.slice(1)[0].map((post: IPostItem) => <PostItem post={post} key={post.id} />)
          ) : (
            <div className='h-48 grid place-items-center'>No items</div>
          )}
        </div>
      ) : (
        <div className='h-48 grid place-items-center'>Error</div>
      )}
      {isLoading ? null : data ? <PagePagination count={data[0]} /> : null}
    </div>
  )
}

function PagePagination({ count }: { count: number }) {
  const searchParams = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString())
  const defaultValue = searchParams.get('page') ?? '1'

  return (
    <div className='mt-10 flex justify-center'>
      <Pagination
        total={count}
        pageSize={5}
        defaultCurrent={Number(defaultValue)}
        onChange={page => {
          newParams.set('page', String(page))
          window.history.pushState(null, '', `?${newParams.toString()}`)
        }}
      />
    </div>
  )
}

function Spinner() {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      version='1.1'
      viewBox='0 0 16 16'
      height='1em'
      width='1em'
      className='animate-spin w-6 h-6'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8 16c-2.137 0-4.146-0.832-5.657-2.343s-2.343-3.52-2.343-5.657c0-1.513 0.425-2.986 1.228-4.261 0.781-1.239 1.885-2.24 3.193-2.895l0.672 1.341c-1.063 0.533-1.961 1.347-2.596 2.354-0.652 1.034-0.997 2.231-0.997 3.461 0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-0.345-2.426-0.997-3.461-0.635-1.008-1.533-1.822-2.596-2.354l0.672-1.341c1.308 0.655 2.412 1.656 3.193 2.895 0.803 1.274 1.228 2.748 1.228 4.261 0 2.137-0.832 4.146-2.343 5.657s-3.52 2.343-5.657 2.343z'></path>
    </svg>
  )
}
