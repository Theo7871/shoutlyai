import { redirect } from "next/navigation";

// This route used to render its own signup form (components/auth/SignUpForm)
// that never actually called the backend — email/password signup was a fake
// 1s delay, and Google signup posted to a stale, unrelated backend URL.
// /sign-up is the real, working implementation (linked from the site
// header); redirect here instead of maintaining two parallel signup flows.
export default function SignUpRedirect() {
    redirect("/sign-up");
}
