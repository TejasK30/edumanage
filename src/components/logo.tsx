import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

const Logo = () => {
  return (
    <>
      <div className="bg-muted">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            EduManage
          </Link>
        </div>
      </div>
    </>
  )
}

export default Logo
