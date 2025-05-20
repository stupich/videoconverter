import { Link } from '@inertiajs/react'

export default function Layout({ children, isLoggedIn }) {
    function AuthButton() {
        if (isLoggedIn) {
            return (
                <Link href="/logout">
                    <button className="btn btn-error w-30 mr-12">Logout</button>
                </Link>
            )
        } else {
            return (
                <Link href="/auth">
                    <button className="btn btn-primary w-30 mr-12">Login</button>
                </Link>
            )
        }
    }
    return (
        <main data-theme="night" >
            <div className="layout border-b border-base-content/9 ">
                <AuthButton />
            </div>
            <article>{children}</article>
        </main>
    )
}
