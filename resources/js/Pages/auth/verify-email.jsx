import { Link } from '@inertiajs/react'
export default function EmailVerification({ email }) {
    return (
        <div className="flex flex-col justify-center items-center gap-12 mt-[25%]">
            <label>We sent a confirmation link to your email: {email}</label>
            <div className="flex flex-row justify-center items-center gap-12">
                <Link href="email/verification-notification" method='get'>
                    <button className="btn btn-primary w-38">Re-send the link</button>
                </Link>
                <Link href="logout">
                    <button className="btn btn-error w-38">Logout</button>
                </Link>
            </div>
        </div>
    )
}
