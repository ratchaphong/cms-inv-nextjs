import styles from "./logo.module.scss";
import classNames from "classnames";

type LogoSize = "lg" | "base" | "sm";

export const BStoreLogo = ({ size = "lg" }: { size?: LogoSize }) => (
  <h1 className={classNames(styles.container, styles[size])}>
    <span className={styles.bigI}>B</span>
    <span className={styles.titleText}>store</span>
  </h1>
);
