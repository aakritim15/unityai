import { Button } from "@/components/ui/button";

const Login = ({
  heading = "Shadcnblocks.com",
  subheading = "Welcome back",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
  },
  googleText = "Log in with Google",
  onGoogleSignIn={handleGoogleSignIn}
}) => {
  return (
    <section className="py-64">
      <div>
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-sm">
    U<sub>AI</sub>
  </span>
</div>
              <h1 className="text-[3vh] font-bold">Unity AI</h1>
              <p className="mb-2 text-2xl font-bold">{heading}</p>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div>
              <div className="grid gap-4">
                <Button variant="outline" className="w-full" onClick={onGoogleSignIn}>
                  <img src="google.svg" className="h-5" />
                  {googleText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
