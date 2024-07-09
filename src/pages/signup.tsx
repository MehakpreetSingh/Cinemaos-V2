import React, { useState, useEffect } from "react";
import styles from "@/styles/Settings.module.scss";
import Link from "next/link";
import { signupUserManual } from "@/Utils/firebaseUser";
import { useRouter } from "next/navigation";
import { getSettings } from "@/Utils/settings";

const SignupPage = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { push } = useRouter();
  const mode = getSettings()?.mode;
  const handleFormSubmission = async (e: any) => {
    e.preventDefault();
    if (await signupUserManual({ username, email, password })) {
      push("/settings");
    }
  };
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        {mode === "dark" ? (
          <img
            src="/images/logoSq.png"
            alt="logo"
            data-tooltip-id="tooltip"
            data-tooltip-content="Rive"
          />
        ) : (
          <img
            src="/images/logoSq-white.png"
            alt="logo"
            data-tooltip-id="tooltip"
            data-tooltip-content="Rive"
          />
        )}
      </div>
      <div className={styles.settings}>
        <h1>Signup</h1>
        <div className={styles.group2}>
          <>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
            <button onClick={handleFormSubmission}>submit</button>
          </>
        </div>
        <h4>
          Already a Cinemaos member!{" "}
          <Link href="/login" className={styles.highlight}>
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignupPage;
