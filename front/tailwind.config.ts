import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--sans-font)'
      }
    }
  },
  plugins: []
}
export default config
