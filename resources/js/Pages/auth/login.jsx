import { useForm } from '@inertiajs/react';

export default function LoginPage() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    })
    function handleChangeEmail(e) {
        clearErrors();
        setData('email', e.target.value);
    }
    function handleChangePassword(e) {
        clearErrors();
        setData('password', e.target.value);
    }
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
            <label className="floating-label">
                <span>Your Email</span>
                <input className="input validator w-80" type="email" value={data.email} onChange={e => handleChangeEmail(e)} required placeholder="Your Email" disabled={processing}></input>
            </label>
            <label className="floating-label">
                <span>Password</span>
                <input className="input validator w-80" type="password" required value={data.password} onChange={e => handleChangePassword(e)} placeholder="Password" disabled={processing}></input>
            </label>
            {errors.email && <div className="text-xs text-error">{errors.email}</div>}
            <label className="label">
                <input type="checkbox" className="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} disabled={processing}></input>
                Remember me
            </label>
            <button className="btn btn-primary w-80" type="submit" disabled={processing} name="login">Login</button>
            <button className="btn btn-primary w-80" type="submit" disabled={processing} name="register">Register</button>
        </form>
    )
}
