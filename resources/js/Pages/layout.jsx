import { Link } from '@inertiajs/react'

export default function Layout({ children, isLoggedIn }) {
    function AuthButton() {
        if (isLoggedIn) {
            return (
                <Link href="/logout">
                    <button className="btn btn-error w-20">Logout</button>
                </Link>
            )
        } else {
            return (
                <Link href="/auth">
                    <button className="btn btn-primary w-20">Login</button>
                </Link>
            )
        }
    }
    return (
        <main data-theme="night">
            <AuthButton />
            <article>{children}</article>
        </main>
    )
}
