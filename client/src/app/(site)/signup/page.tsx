import Logo from "@/components/logo"
import { SignUpForm } from "@/components/forms/signup-form"

export default function SignUpPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted p-6 md:p-10 overflow-hidden">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Logo />
          <div className="overflow-hidden">
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  )
}
