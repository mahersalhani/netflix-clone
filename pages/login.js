import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email) {
      // route to dashboard
      if (email === "maheryos5@gmail.com") {
        // route to dashboard
        try {
          const didToken = await magic.auth.loginWithMagicLink({ email });
          if (didToken) {
            router.push("/");
          }
        } catch (err) {}
      } else {
        console.log("Something went wrong logging in");
        setIsLoading(false);
      }
    } else {
      // show user message
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <a>
              <div className={styles.logoWrapper}>
                <Image src="/static/netflix.svg" alt="Netflix logo" width="128px" height="34px" />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input onChange={handleOnChangeEmail} type="text" placeholder="Email address" className={styles.emailInput} />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

// WyIweDM3ZjU1ODExNGI2Njk4YTI3ZmIyN2I1NmQyZTc5NjAyNDljOTFhMDJkOGZiOWJiODhiYWVkMmY3OTZhOGUwYzc3YmFmNDc2MjFjMjk5ZjRlMjJhN2UzNjExYzY5MWJhYjg1YjhjMzE3ZDNiYzE3ODhiMDQ1MzZiMDM0YjFiM2I5MWIiLCJ7XCJpYXRcIjoxNjYyMzE3MjQ4LFwiZXh0XCI6MTY2MjMxODE0OCxcImlzc1wiOlwiZGlkOmV0aHI6MHg1NDA2NDc2RTlkMThhMjQyRTgyNGIyRDE3ZTE0ODVlQmMxNTY5OWI0XCIsXCJzdWJcIjpcIi1PVEJnWWxsVkdEZVdHeGYwMVJnb1Y5d3FJaVBlVUozTm15TmxvbHA0Y2M9XCIsXCJhdWRcIjpcIkR1ZlFHbGlZM3diTTU4Tk4za2RKbEJPYzhiak90b0hIb3NLU3ZvVVlwMXM9XCIsXCJuYmZcIjoxNjYyMzE3MjQ4LFwidGlkXCI6XCJjNzg4YjFkMC02NTM4LTQ4ZTktODEzNC00NzM5ZTZhYmFkYTFcIixcImFkZFwiOlwiMHhkOGJkM2I3NDg4NzdmOWRlNzA0NGEwYjU2MjZjNDAzNGY0ZWNjYjBmNmNhOGY2ODA1ZTUyZjI2NWE5MmZjNTg0MzY0NTE1MmNjNzI2MzNlNmEwMzExOGZjYzViZjJiZTFlZmRjNTJiMTA4ZjZiNGEzZTZhNTRlY2IxMDllYzczYjFiXCJ9Il0=
