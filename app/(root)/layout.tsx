import SearchModal from "@/components/modals/search-modal"
import ClientOnly from "@/components/shared/ClientOnly"
import Navbar from "@/components/shared/navbar/Navbar"
import Footer from "@/components/ui/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-auto flex-col">
      <main className="flex-1">
        <ClientOnly>
          <Navbar />
          <SearchModal />
        </ClientOnly>
        {children}
        <Footer />
      </main>
    </div>
  )
}
