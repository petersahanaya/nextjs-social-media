import Footer from '../../components/Footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main>
            {children}
            <Footer/>
        </main>
  )
}
