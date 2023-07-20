"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import database from "@/services/database/Database";
import styles from "@/styles/common/Form.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            try {
              database.AddUser(
                {
                  username,
                  email,
                },
                user.uid
              );
            } catch (error) {
              console.error(error);
            }
          })
          .catch((error) => {
            if (error.code === "auth/invalid-display-name") {
              /* Implement client side logging of errors and warnings */
            } else if (error.code === "auth/display-name-too-long") {
              /* Implement client side logging of errors and warnings */
            }
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          /* Implement client side logging of errors and warnings */
        }
      });
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

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
          Register
        </button>
      </form>

      <p className={styles.formText}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
