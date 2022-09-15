import styles from "./style.module.css";
import Card from "./../Card/index";
import Link from "next/link";

const SectionCards = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos?.map((video, i) => {
          return (
            <Link key={video.id} href={`/video/${video.id}`}>
              <a>
                <Card id={i} imgUrl={video.imgUrl} size={size} />;
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
