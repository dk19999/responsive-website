import { useEffect, useRef, useState } from "react";
import styles from "./article.module.css";

export interface Article {
  id: number;
  title: string;
  image_url: string;
  prompt: string;
}

interface ArticleSectionProps {
  title: string;
  articles: Article[];
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ title, articles }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!carouselRef.current) {
      return;
    }
    const scrollLeft = carouselRef.current.scrollLeft;
    const slideWidth = carouselRef.current.clientWidth;
    const newActiveSlide = Math.round(scrollLeft / slideWidth);
    setActiveSlide(newActiveSlide);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel?.addEventListener?.("scroll", handleScroll);
    return () => {
      carousel?.removeEventListener?.("scroll", handleScroll);
    };
  }, []);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
    if (!carouselRef.current) {
      return;
    }
    const scrollAmount = carouselRef.current.clientWidth * index;
    carouselRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.articleSection}>
      <h2 className={styles.articleSectionTitle}>{title}</h2>
      <div ref={carouselRef} className={styles.carousel}>
        {articles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <img
              src={article.image_url}
              alt={article.title}
              className={styles.articleImage}
            />
          </div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {articles.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === activeSlide ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
