import Link from "next/link";
import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-provider.module.css";

interface IProvider {
  link?: string;
  buy?: any[];
  rent?: any[];
  flatrate?: any[];
}

async function getProvider(id: string) {
  const res = await fetch(`${API_URL}/${id}/providers`);
  return res.json();
}

export default async function MovieProvider({ id }: { id: string }) {
  const providers = await getProvider(id);
  const { link, ...provider } = {
    ...{ link: "", buy: [], rent: [], flatrate: [] },
    ...providers.KR,
  } as IProvider;

  return (
    <div className={styles.container}>
      <Link href={link} className={styles["provider-link"]}>
        <div className={styles["provider-container"]}>
          {Object.entries(provider).map(([key, value]) => {
            if (value.length === 0) return;
            return (
              <div key={key} className={styles["provider-item"]}>
                <span className={styles["provider-category"]}>
                  {key === "flatrate" ? "stream" : key}
                </span>
                {value.map((channel, idx) => {
                  const imgUrl = "https://image.tmdb.org/t/p/w300";
                  const logoPath =
                    (channel.logo_path.includes(imgUrl) ? "" : imgUrl) +
                    channel.logo_path;
                  return (
                    <img
                      key={idx}
                      className={styles["provider-channel"]}
                      src={logoPath}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
}
