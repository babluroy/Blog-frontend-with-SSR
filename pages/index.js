import Head from 'next/head'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Intesol Blogs</title>
        <meta name="description" content="Intesol blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
