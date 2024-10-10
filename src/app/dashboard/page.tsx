"use client";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import api from "@/utils/axios";
import Image from "next/image";
import ArticleSection, { Article } from "./article-section";
import { useRouter } from "next/navigation";
async function fetchArticles() {
  try {
    const res = await api("");
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return [];
}

const Dashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchArticles().then((res) => {
      setArticles(res);
    });
  }, []);

  const photographyArticles = articles.filter(
    (article) => article.prompt === "Photography"
  );
  const learningArticles = articles.filter(
    (article) => article.prompt === "Learning"
  );

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className={styles.dashboardContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        logout
      </button>
      <header className={styles.header}>
        <Image
          width={140}
          height={60}
          src="/icons/logo-white.png"
          alt="Logo"
          className={styles.logo}
        />
      </header>

      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h1 className={styles.welcomeText}>
            Welcome <span className={styles.userName}>Test</span>
          </h1>
          <p className={styles.goodDayText}>Hope you are having a good day!</p>
        </section>

        <ArticleSection title="Photography" articles={photographyArticles} />

        <ArticleSection title="Learning" articles={learningArticles} />
      </main>
    </div>
  );
};

export default Dashboard;
