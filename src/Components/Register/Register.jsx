import React, { useContext, useState } from 'react'; // Added useState
import styles from './Register.module.css'; // Ensure your styles are imported
import layerimg from '../../assets/image.gif'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/UserContext';
import { useEffect } from 'react';

export default function Register() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);
  const [apierror , setApiError]=useState(null)
  const [loginapierror , setLoginApiError]=useState(null)
  const [loading ,setloading]=useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginFrom,setLoginForm]=useState(false);
  let navigate=useNavigate();
  let{setUserToken}=useContext(Usercontext)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    
    // Initialize on load
    handleResize();

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  async function register(values){
   try{
    setloading(true)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  localStorage.setItem('userToken',data.token)
  setUserToken(data.token)
   setloading(false)
   navigate('/')
}catch(err){
  setApiError(err.response.data.message)
  setloading(false) 
}
  }
////////////////////////////////////////////// Login function
async function login(values) {
  try {
    setloading(true);
    let { data } = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      values
    );
    localStorage.setItem('userToken', data.token);
    setUserToken(data.token)
    setloading(false);
    navigate('/');
  } catch (error) {
    setLoginApiError(error.response.data.message);
    setloading(false);
  }
}


 let validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is Requird').min(3,"min is 3 letters").max(15,'max is 15 letters'),
  email: Yup.string().required('Email is Requird').email('invalid email'),
  password: Yup.string().required('Password is Requird').matches(/^.{6,}$/,' password is week' ), /*/^[A-Z]\w{4,10}$/ ,*/
  rePassword: Yup.string().required('rePassword is Requird').oneOf([Yup.ref('password')], 'repassword must match'),
  phone: Yup.string().required('phone is Requird').matches(/^01[0125][0-9]{8}$/, 'please enter an Egyption phone')
 })

 ////////////////////////////////////////////////////////// Validation schema for login
 let loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

  const formik = useFormik({
   initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
   },
   validationSchema:validationSchema
   ,onSubmit:register
  })
  ///////////////////////////////////////// Formik instance for login
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: login,
  });
/////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    {isMobile ? (
         <section className='flex justify-center items-center h-screen'>
         <div className="p-6 rounded-lg shadow-md w-full max-w-sm"
         style={{ backgroundImage: `url(${layerimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
         {!isLoginFrom? (
          <> 
         <h1 className="text-2xl font-bold mb-6 text-center text-white">Register here.</h1>

{apierror && <div className='p-1 bg-red-300 rounded-lg mb-4'>{apierror}</div>}

<form onSubmit={formik.handleSubmit} className="space-y-4 bg-transparent">
  <input
    type="text"
    placeholder="Name"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
    id="name"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.name && formik.touched.name && <div className='text-red-500 text-sm'>{formik.errors.name}</div>}

  <input
    type="email"
    placeholder="Email"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
    id="email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.email && formik.touched.email && <div className='text-red-500 text-sm'>{formik.errors.email}</div>}

  <input
    type="password"
    placeholder="Password"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
    id="password"
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.password && formik.touched.password && <div className='text-red-500 text-sm'>{formik.errors.password}</div>}

  <input
    type="password"
    placeholder="Re-enter Password"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
    id="rePassword"
    name="rePassword"
    value={formik.values.rePassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.rePassword && formik.touched.rePassword && <div className='text-red-500 text-sm'>{formik.errors.rePassword}</div>}

  <input
    type="tel"
    placeholder="Phone"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
    id="phone"
    name="phone"
    value={formik.values.phone}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.phone && formik.touched.phone && <div className='text-red-500 text-sm'>{formik.errors.phone}</div>}

  <button 
    type="submit" 
    className='py-2 px-6 bg-[#4bb6b7] rounded-xl text-white text-xl w-full text-center'
    disabled={loading}
  >
    {loading ? (
      <i className="fas fa-spinner fa-spin"></i>
    ) : (
      "Register"
    )}
  </button>
  <div className="mt-6 text-center">
              <p className="text-white">Already have an account?</p>
              <button
                onClick={() => setLoginForm(true)}
                className="text-[#4bb6b7] hover:text-[#4a9b9a] focus:outline-none font-bold"
              >
                Login here
              </button>
            </div>
  
</form></>) : (<>
  <h1 className="text-2xl font-bold mb-6 text-center text-white mt-8">Login here.</h1>
        
        {loginapierror && <div className='p-1 bg-red-300 rounded-lg mb-4'>{loginapierror}</div>}

        <form onSubmit={loginFormik.handleSubmit} className="space-y-4 bg-transparent">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            id="email"
            name="email"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.email && loginFormik.touched.email && <div className='text-red-500 text-sm'>{loginFormik.errors.email}</div>}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            id="password"
            name="password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.password && loginFormik.touched.password && <div className='text-red-500 text-sm'>{loginFormik.errors.password}</div>}

          <button 
            type="submit" 
            className="py-2 px-6 bg-[#4bb6b7] rounded-xl text-white text-xl w-full text-center"
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Log in"
            )}
          </button>
          <p className="text-white">Don't have an account?</p>
              <button
                onClick={() => setLoginForm(false)}
                className="text-[#4bb6b7] hover:text-[#4a9b9a] focus:outline-none font-bold"
              >
                Register here
              </button>
        </form></>)}       
      </div>
  </section>
        ):
    (<section className='reg my-10'>
      <div
        className={`${styles.container} ${
          isRightPanelActive ? styles["right-panel-active"] : ""
        }`}
       >
        <div className={`${styles["form-container"]} ${styles["register-container"]} `}>
          <form action="#" className={styles} onSubmit={formik.handleSubmit}>
            <h1 className={`${styles.head1} font-bold text-xl`}>Register here.</h1>
            {apierror && <div className='p-1 bg-red-300 rounded-lg w-full sm:text-sm'>{apierror}</div>}
            <input className={styles.input} type="text"  placeholder="Name" id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.name && formik.touched.name && <div className='p-1 bg-red-300 rounded-lg w-full'>{formik.errors.name}</div>}
            <input className={styles.input} type="email" placeholder="Email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email && <div className='p-1 bg-red-300 rounded-lg w-full'>{formik.errors.email}</div>}
            <input className={styles.input} type="password" placeholder="Password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password && <div className='p-1 bg-red-300 rounded-lg w-full'>{formik.errors.password}</div>}
            <input className={styles.input} type="password" placeholder="RePassword" id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rePassword && formik.touched.rePassword && <div className='p-1 bg-red-300 rounded-lg w-full'>{formik.errors.rePassword}</div>}
            <input className={styles.input} type="tel" placeholder="Phone" id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.phone && formik.touched.phone && <div className='p-1 bg-red-300 rounded-lg w-full'>{formik.errors.phone}</div>}
            {loading ? <button className='py-2 px-6 bg-[#4bb6b7] rounded-xl text-[#4F46E5] flex'><i className='fas fa-spinner fa-spin text-xl'></i></button> :<button type='submit' className={styles.btn}>Register</button>}
            
            
          </form>
        </div>
        <div className={`${styles["form-container"]} ${styles["login-container"]}`}>
          <form action="#" className={styles} onSubmit={loginFormik.handleSubmit}>
            <h1 className={`${styles.head1} font-bold text-xl `}>Login here.</h1>
            {loginapierror && <div className='p-1 bg-red-300 rounded-lg w-full'>{loginapierror}</div>}
            <input className={styles.input} type="email" placeholder="Email" id='email' name='email' value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
            {loginFormik.errors.email && loginFormik.touched.email && <div className='p-1 bg-red-300 rounded-lg w-full'>{loginFormik.errors.email}</div>}
            <input className={styles.input} type="password" placeholder="Password" id='password' name='password' value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
            {loginFormik.errors.password && loginFormik.touched.password && <div className='p-1 bg-red-300 rounded-lg w-full'>{loginFormik.errors.password}</div>}
            {/* <div className={styles.content}>
              <div className={styles.checkbox}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className={styles["pass-link"]}>
                <a href="#">Forgot password?</a>
              </div>
            </div> */}
            {loading ? <button className='py-2 px-6 bg-[#4bb6b7] rounded-xl text-[#4F46E5] flex'><i className='fas fa-spinner fa-spin text-xl'></i></button> :<button type='submit' className={styles.btn}>Log in</button>}
          </form>
        </div>
        <div className={styles["overlay-container"]}>
        <div
  className={`${styles.overlay}`}
  style={{ backgroundImage: `url(${layerimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
 >
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1 className={`${styles.head1} text-3xl m-0`}>
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
              <h1 className={`${styles.head1} text-3xl m-0 `}>
                Start your <br /> journey now
              </h1>
              <p>
                If you don't have an account yet, join us and start your journey.
              </p>
              <button
                className={`${styles.ghost} ${styles.btn}`}
                onClick={() => setIsRightPanelActive(true)}
              >
                Register
                <i className="lni lni-arrow-right register" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>)}
    </>
  );
}

