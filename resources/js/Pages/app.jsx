import Layout from './layout.jsx'
import { useForm, Link } from '@inertiajs/react'

export default function Welcome({ isFileReady, hashedFilename, isLoggedIn, history, presetLink }) {
    const { data, setData, post, put, errors, processing } = useForm({
        link: presetLink,
        format: 'mp4',
    })
    function ConvertAgainButton({ link }) {
        return (
            <Link href={`/?link=${link}`} >
                <button className="btn btn-primary w-38" >Re-convert</button>
            </Link>
        )
    }
    function HistoryTable() {
        if (isLoggedIn) {
            return (
                <div className="overflow-x-auto historyTable">
                    <table className="table w-300 rounded-xl border border-separate border-base-content/9">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Video Link</th>
                                <th>Video Name</th>
                                <th>Format</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, i) =>
                                <tr>
                                    <th key={i.toString()}>{i + 1}</th>
                                    <td key={entry.link.toString()} className="w-70">{entry.link}</td>
                                    <td key={entry.videoname.toString()} className="w-80">{entry.videoname}</td>
                                    <td key={entry.format.toString()}>{entry.format}</td>
                                    <td key={entry.created_at.toString()} className="w-50">{entry.created_at}</td>
                                    <td className="w-40"><ConvertAgainButton link={entry.link.toString()} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div >
            )
        } else {
            return (
                <label className="historyTableLogin">You have to login to see your history of conversions!</label>
            )
        }
    }
    const submit = (e) => {
        e.preventDefault();
        post('download', data);
    }
    return (
        <Layout isLoggedIn={isLoggedIn}>
            <form className="main" onSubmit={submit}>
                <label className="floating-label">
                    <span>Youtube Link</span>
                    <input className="input input-primary w-230" type="text" placeholder="Youtube Link" value={data.link} onChange={e => setData('link', e.target.value)} disabled={processing}></input>
                </label>
                <select className="select select-primary w-38" value={data.format} onChange={e => setData('format', e.target.value)} disabled={processing}>
                    <option>mp4</option>
                    <option>mkv</option>
                    <option>mp3</option>
                    <option>vorbis</option>
                </select>
                <button className="btn btn-primary w-38" type="submit" disabled={processing}>Convert</button>
            </form>
            <div className="flex flex-col items-center mt-10">
                {processing &&
                    <span className="loading loading-spinner loading-xl"></span>
                }
                {
                    isFileReady && !processing &&
                    <div className="flex flex-col items-center gap-8">
                        <label>Your file is ready to download!</label>
                        <a href={'/download/' + hashedFilename} target="_blank">
                            <button className="btn btn-primary w-50">Download</button>
                        </a>
                    </div>
                }
                <HistoryTable />
            </div>
        </Layout >
    )
}
