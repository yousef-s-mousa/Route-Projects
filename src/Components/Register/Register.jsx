import React, { useState } from 'react'; // Added useState
import styles from './Register.module.css'; // Ensure your styles are imported
import layerimg from '../../assets/image.gif'

export default function Register() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <>
    <section className='reg'>
      <div
        className={`${styles.container} ${
          isRightPanelActive ? styles["right-panel-active"] : ""
        }`}
       >
        <div className={`${styles["form-container"]} ${styles["register-container"]}`}>
          <form action="#" className={styles}>
            <h1 className={`${styles.head1} font-bold text-xl`}>Register here.</h1>
            <input className={styles.input} type="text" placeholder="Name" />
            <input className={styles.input} type="email" placeholder="Email" />
            <input className={styles.input} type="password" placeholder="Password" />
            <button className={styles.btn}>Register</button>
          </form>
        </div>
        <div className={`${styles["form-container"]} ${styles["login-container"]}`}>
          <form action="#" className={styles}>
            <h1 className={`${styles.head1} font-bold text-xl`}>Login here.</h1>
            <input className={styles.input} type="email" placeholder="Email" />
            <input className={styles.input} type="password" placeholder="Password" />
            {/* <div className={styles.content}>
              <div className={styles.checkbox}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className={styles["pass-link"]}>
                <a href="#">Forgot password?</a>
              </div>
            </div> */}
            <button className={styles.btn}>Login</button>
          </form>
        </div>
        <div className={styles["overlay-container"]}>
        <div
  className={`${styles.overlay}`}
  style={{ backgroundImage: `url(${layerimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1 className={`${styles.head1} text-5xl m-0`}>
                Hello
              </h1>
              <p>If you have an account, login here </p>
              <button
                className={`${styles.ghost} ${styles.btn}`}
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
                <i className="lni lni-arrow-left login" />
              </button>
            </div>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <h1 className={`${styles.head1} text-5xl m-0 `}>
                Start your <br /> journey now
              </h1>
              <p>
                If you don't have an account yet, join us and start your journey.
              </p>
              <button
                className={`${styles.ghost} ${styles.btn}`}
                id="register"
                onClick={() => setIsRightPanelActive(true)}
              >
                Register
                <i className="lni lni-arrow-right register" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
