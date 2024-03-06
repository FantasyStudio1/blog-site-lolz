import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ErrorWithStatusType = Error & {
  status: number
}

export const isObject = (object: unknown): object is Record<string, unknown> =>
  typeof object === 'object' && object !== null && !Array.isArray(object)

export const isErrorWithStatus = (error: unknown): error is ErrorWithStatusType => {
  if (!isObject(error)) return false

  return error instanceof Error && Object.hasOwn(error, 'status')
}
