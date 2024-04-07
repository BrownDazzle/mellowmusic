
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-auto flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
