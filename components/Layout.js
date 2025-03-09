import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/Utils.module.css";
import Link from "next/link";

const name = "kenta";
export const siteTitle = "Next.js blog";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            ></img>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
            ></img>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
        {/* <title>{siteTitle}</title> */}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">←ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
