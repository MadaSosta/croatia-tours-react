"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import database from "@/services/database/Database";
import styles from "@/styles/common/Form.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TUser, TUserDataError } from "@/types/typings";
import { validateUsername, validateEmail } from "@/utils/login/LoginUtils";
import { validatePassword } from "@/utils/register/RegisterUtils";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState<TUser>({
    username: "",
    email: "",
    password: "",
  });

  const [userDataError, setUserDataError] = useState<TUserDataError>({
    username: {
      message: undefined,
    },
    email: {
      message: undefined,
    },
    password: {
      message: undefined,
      containsEnoughCharacters: false,
      containsUpperCaseCharacter: false,
      containsLowerCaseCharacter: false,
      containsNumber: false,
    },
  });

  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState<
    string | undefined
  >(undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    createUserWithEmailAndPassword(auth, userData.email, userData.password!)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: userData.username,
        })
          .then(() => {
            try {
              database.AddUser(
                {
                  username: userData.username,
                  email: userData.email,
                },
                user.uid
              );
              router.push("/");
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

  const validateForm = () => {
    setFirebaseErrorMessage(undefined);

    const usernameCheck = validateUsername(userData);
    const emailCheck = validateEmail(userData.email);
    const passwordCheck = validatePassword(userData.password);

    setUserDataError((prev) => {
      return {
        ...prev,
        username: {
          message: usernameCheck.message,
        },
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

    return usernameCheck.isValid && emailCheck.isValid && passwordCheck.isValid;
  };

  return (
    <div className={styles.register}>
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>Register</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.boxInput}>
            <AiOutlineUser className={styles.icon} />
            <input
              className={styles.formInput}
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={({ target }) =>
                setUserData((prev) => ({
                  ...prev,
                  username: target.value,
                }))
              }
            />
            <label className={styles.labelEffect}>Username</label>
            <div className={styles.errorContainer}>
              <p className={styles.errorDisplay}>
                {userDataError.username.message}
              </p>
            </div>
          </div>

          <div className={styles.boxInput}>
            <FiMail className={styles.icon} />
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
            Register
          </button>
        </form>

        <p className={styles.formText}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
