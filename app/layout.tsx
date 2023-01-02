import './(global)/globals.css'
import { Poppins } from '@next/font/google'
import Provider from './(global)/Provider'

const poppins = Poppins( {subsets : ["latin"], weight : ["300" ,"400", "500", "600", "700"], fallback : ["sans-serif", "system-ui"] } )

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className={poppins.className}>
          <Provider>
            {children}
          </Provider>
        </main>
      </body>
    </html>
  )
}
