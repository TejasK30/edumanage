import Logo from "@/components/logo"
import React, { ReactNode } from "react"

type DefaultLayoutProps = {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="p-2 bg-muted">
      <div>
        <Logo />
      </div>
      <main>{children}</main>
    </div>
  )
}
