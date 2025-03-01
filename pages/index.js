import Head from 'next/head'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { url_constants } from '../utils/routerLink_constants';

export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    router.push(url_constants.home)
  },[])

  return (
    <div>
      <Head>
        <title>Intesol</title>
        <meta name="description" content="Intesol blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
