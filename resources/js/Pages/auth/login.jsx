import { useForm } from '@inertiajs/react';

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    function submit(e) {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "login") {
            post('auth/login', data);
        }
        if (e.nativeEvent.submitter.name == "register") {
            post('auth/register', data);
        }
    }
    return (
        <form className="loginForm" onSubmit={submit}>
            <input className="input validator w-80" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required placeholder="mail@site.com" disabled={processing}></input>
            <input className="input validator w-80" type="password" required value={data.password} onChange={e => setData('password', e.target.value)} placeholder="password" disabled={processing}></input>
            <label className="label">
                <input type="checkbox" className="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} disabled={processing}></input>
                Remember me
            </label>
            <button className="btn btn-primary w-80" type="submit" disabled={processing} name="login">Login</button>
            <button className="btn btn-primary w-80" type="submit" disabled={processing} name="register">Register</button>
        </form>
    )
}
