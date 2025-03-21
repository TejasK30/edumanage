import { FOOTER_LINKS } from "@/lib/site-constants"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-primary/10 text-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
