"use client";
import { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import Image from "next/image";
import useIsMobile from "@/hooks/use-is-mobile";

const Login = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/login/", {
        username: email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image height={60} width={135} alt="logo" src="/icons/logo.png" />
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <h1 className={styles.stepTitle}>STEP 1</h1>
              <h2 className={styles.mainHeading}>
                Enter your email address to continue
              </h2>
              <p className={styles.subText}>
                Log in to your account. If you don’t have one, you will be
                prompted to create one.
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className={styles.continueButtonContainer}>
                {isMobile ? (
                  <a className={styles.accountText}>Have an account?</a>
                ) : null}
                <button type="submit" className={styles.continueButton}>
                  Continue
                </button>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <>
            <form onSubmit={handlePasswordSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <h1 className={styles.stepTitle}>STEP 2</h1>
                <h2 className={styles.mainHeading}>
                  Create an account to continue
                </h2>
                <p className={styles.subText}>
                  You’ll be able to log in to Dingoo with this email address and
                  password.
                </p>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  id="password"
                  placeholder="Choose a password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className={styles.buttonContainer}>
                  <p className={styles.passwordHint}>
                    Use a minimum of 6 characters (case sensitive) with at least
                    one number or special character.
                  </p>
                  <button type="submit" className={styles.continueButton}>
                    {isMobile ? "Continue" : "Agree & Continue"}
                  </button>
                </div>
              </div>
            </form>
            <p className={styles.agreement}>
              Dingoo will use your data to personalise and improve your Dingoo
              experience and to send you information about Dingoo. You can
              change your communication preferences anytime. We may use your
              data as described in our Privacy Policy, including sharing it with
              The Test of Companies. By clicking Agree & Continue, you agree to
              our Subscriber Agreement and acknowledge that you have read our
              Privacy Policy and Collection Statement.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
