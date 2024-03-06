import { NavLink } from '@/components/nav-link'

export function Header() {
  return (
    <header className='max-w-[calc(768px+16px*2)] mx-auto mb-4 w-full border-b border-solid border-slate-200 p-4'>
      <nav className='flex items-center gap-4' aria-label='Главная навигация'>
        <NavLink href='/'>Главная</NavLink>
        <NavLink href='/admin'>Админ</NavLink>
      </nav>
    </header>
  )
}
