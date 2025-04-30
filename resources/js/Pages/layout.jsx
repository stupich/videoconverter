import { Link } from '@inertiajs/react'

export default function Layout({ children }) {
    return (
        <main data-theme="night">
            <article>{children}</article>
        </main>
    )
}
