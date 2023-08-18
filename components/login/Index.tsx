"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import styles from "@/styles/common/Form.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TUser, TUserDataError } from "@/types/typings";
import { validateEmail } from "@/utils/login/LoginUtils";
import { validatePassword } from "@/utils/register/RegisterUtils";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<TUser>({
    email: "",
    password: "",
    username: "",
  });

  const [userDataError, setUserDataError] = useState<TUserDataError>({
    email: {
      message: undefined,
    },
    password: {
      message: undefined,
    },
    username: {
      message: undefined,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState<
    string | undefined
  >(undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    signInWithEmailAndPassword(auth, userData.email, userData.password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .then(() => {
        router.push("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const validateForm = () => {
    setFirebaseErrorMessage(undefined);
    const emailCheck = validateEmail(userData.email);
    const passwordCheck = validatePassword(userData.password);

    setUserDataError((prev) => {
      return {
        ...prev,
        email: {
          message: emailCheck.message,
        },
        password: {
          message: passwordCheck.message,
          containsEnoughCharacters:
            passwordCheck.password.containsEnoughCharacters,
          containsUpperCaseCharacter:
            passwordCheck.password.containsUpperCaseCharacter,
          containsLowerCaseCharacter:
            passwordCheck.password.containsLowerCaseCharacter,
          containsNumber: passwordCheck.password.containsNumber,
        },
      };
    });
    return emailCheck.isValid && passwordCheck.isValid;
  };

  return (
    <div className={styles.login}>
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.boxInput}>
            <AiOutlineUser className={styles.icon} />
            <input
              className={styles.formInput}
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={({ target }) =>
                setUserData((prev) => ({
                  ...prev,
                  email: target.value,
                }))
              }
            />
            <label className={styles.labelEffect}>Email</label>
            <div className={styles.errorContainer}>
              <p className={styles.errorDisplay}>
                {userDataError.email.message}
              </p>
            </div>
          </div>

          <div className={styles.boxInput}>
            <BiSolidLock className={styles.icon} />
            <input
              className={styles.formInput}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userData.password}
              onChange={({ target }) =>
                setUserData((prev) => ({
                  ...prev,
                  password: target.value,
                }))
              }
            />
            <label className={styles.labelEffect}>Password</label>
            {showPassword ? (
              <FaEye
                onClick={() => setShowPassword(false)}
                className={styles.icon}
                id={styles.loginEye}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(true)}
                className={styles.icon}
                id={styles.loginEye}
              />
            )}
            <div className={styles.errorContainer}>
              <p className={styles.errorDisplay}>
                {userDataError.password.message}
              </p>
            </div>
          </div>
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
