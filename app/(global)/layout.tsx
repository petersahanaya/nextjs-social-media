import Footer from '../../components/Footer'
import Provider from './Provider'

export const runtime = "experimental-edge"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main>
            <Provider>
              {children}
            </Provider>
            <Footer/>
        </main>
  )
}
