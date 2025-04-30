import Layout from './layout.jsx'
import { useForm } from '@inertiajs/react'
export default function Welcome({ isFileReady, hashedFilename, filename, format }) {
    const { data, setData, post, progress, errors, processing } = useForm({
        link: '',
        format: 'mp4',
    })
    const submit = (e) => {
        e.preventDefault();
        post('download', data)
    }
    return (
        <Layout>
            <form className="main" onSubmit={submit}>
                <input className="input input-primary w-230" type="text" value={data.link} onChange={e => setData('link', e.target.value)} disabled={processing}></input>
                <select className="select select-primary w-35" value={data.format} onChange={e => setData('format', e.target.value)} disabled={processing}>
                    <option>mp4</option>
                    <option>mkv</option>
                    <option>mp3</option>
                    <option>vorbis</option>
                </select>
                <button className="btn btn-primary w-35" type="submit" disabled={processing}>Convert</button>
            </form>
            {isFileReady && !processing &&
                <a href={'/download/' + hashedFilename} target="_blank">
                    <button className="btn btn-primary w-50">Download</button>
                </a>
            }
        </Layout >
    )
}
