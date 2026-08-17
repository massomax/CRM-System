import type { JSX } from "react";
import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router";
import logo from "@/assets/logo.svg";
import skeleton from "@/assets/skeleton.svg";
import backgroundPlanet from "@/assets/backgroundPlannet.png";
import commentLeft from "@/assets/commentLeft.svg";
import commentRight from "@/assets/commentRight.svg";
import decor from "@/assets/decor.svg";
import largePlanet from "@/assets/largePlannet.png";
import { ConfigProvider } from "antd";
import { authTheme } from "@/theme/authTheme";

export function AuthLayout(): JSX.Element {
  return (
    <ConfigProvider theme={authTheme}>
      <main className={styles.layout}>
        <div className={styles.bottomPlanet} />
        <section className={styles.preview}>
          <img className={styles.decor} src={decor} alt="" aria-hidden="true" />
          <img
            className={styles.largePlanet}
            src={largePlanet}
            alt=""
            aria-hidden="true"
          />

          <div className={styles.previewInner}>
            <div className={styles.illustrationScene}>
              <div
                className={`${styles.planet} ${styles.planetTop}`}
                aria-hidden="true"
              />
              <div
                className={`${styles.planet} ${styles.planetBottom}`}
                aria-hidden="true"
              />
              <img
                className={`${styles.comment} ${styles.commentLeft}`}
                src={commentLeft}
                alt=""
                aria-hidden="true"
              />
              <img
                className={styles.skeleton}
                src={skeleton}
                alt=""
                aria-hidden="true"
              />
              <img
                className={styles.backgroundPlanet}
                src={backgroundPlanet}
                alt=""
                aria-hidden="true"
              />

              <img
                className={`${styles.comment} ${styles.commentRight}`}
                src={commentRight}
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className={styles.previewText}>
              <h1>Turn your ideas into reality.</h1>
              <p>Start for free and get attractive offers from the community</p>
            </div>
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.formContainer}>
            <img className={styles.logo} src={logo} alt="" aria-hidden="true" />
            <Outlet />
          </div>
        </section>
      </main>
    </ConfigProvider>
  );
}
