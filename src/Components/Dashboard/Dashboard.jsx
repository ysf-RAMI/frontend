import React from "react";
import styles from "./Dashboard.module.css";
import DashboardSection from "./DashboardSection";

const Dashboardd = () => {
  const sections = [
    {
      icon: "ti-users",
      title: "Add other admins",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      icon: "ti-school",
      title: "Add classes",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      icon: "ti-user-plus",
      title: "Add students",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;600&display=swap"
      />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Welcome to your dashboard, Udemy school
          </h1>
          <h2 className={styles.subtitle}>Uyo/school/@teachable.com</h2>
        </header>
        <main className={styles.content}>
          {sections.map((section, index) => (
            <DashboardSection
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default Dashboardd;
