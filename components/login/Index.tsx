"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import styles from "@/styles/common/Form.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.formInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <input
            className={styles.formInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className={styles.formButton} type="submit">
            Login
          </button>
        </form>

        <p className={styles.formText}>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
