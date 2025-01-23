import React, { useState } from 'react'; // Added useState
import styles from './Register.module.css'; // Ensure your styles are imported
import layerimg from '../../assets/login.jpg'

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
          <form action="#">
            <h1 className='font-bold'>Register here.</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
        <div className={`${styles["form-container"]} ${styles["login-container"]}`}>
          <form action="#">
            <h1 className='font-bold'>Login here.</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            {/* <div className={styles.content}>
              <div className={styles.checkbox}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className={styles["pass-link"]}>
                <a href="#">Forgot password?</a>
              </div>
            </div> */}
            <button>Login</button>
          </form>
        </div>
        <div className={styles["overlay-container"]}>
        <div
  className={`${styles.overlay}`}
  style={{ backgroundImage: `url(${layerimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1 className='text-5xl m-0'>
                Hello
              </h1>
              <p>If you have an account, login here </p>
              <button
                className={`${styles.ghost}`}
                id="login"
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
                <i className="lni lni-arrow-left login" />
              </button>
            </div>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <h1 className='text-5xl m-0'>
                Start your <br /> journey now
              </h1>
              <p>
                If you don't have an account yet, join us and start your journey.
              </p>
              <button
                className={`${styles.ghost}`}
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
