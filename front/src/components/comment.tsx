import { IComment } from '@/lib/types'

export function Comment({ item }: { item: IComment }) {
  return (
    <div className='border border-solid border-[rgba(0,0,0,.114)] p-3 rounded-md'>
      <div className='font-medium mb-2'>{item.author}</div>
      <p className='text-sm'>{item.text}</p>
    </div>
  )
}
