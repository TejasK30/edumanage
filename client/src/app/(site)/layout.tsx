import { ReactNode } from "react"

type DefaultLayoutProps = {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="p-2 bg-muted">
      <div></div>
      <main>{children}</main>
    </div>
  )
}
