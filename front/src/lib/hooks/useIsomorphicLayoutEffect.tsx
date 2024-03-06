import { useEffect, useLayoutEffect as useLayoutEffectFromReact } from 'react'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffectFromReact : useEffect
