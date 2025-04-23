import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-credit.module.css";

async function getCredit(id: string) {
  const res = await fetch(`${API_URL}/${id}/credits`);
  return res.json();
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredit(id);
  return (
    <div className={styles.container}>
      <div className={styles["credit-container"]}>
        {credits.map((credit, idx) => {
          const backgroundStyle = credit.profile_path && {
            backgroundImage: `url(${credit.profile_path})`,
          };
          return (
            <div key={idx} className={styles["credit-itme"]}>
              <span className={styles["credit-name"]}>{credit.name}</span>
              <div className={styles["credit-img"]} style={backgroundStyle} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
