import React, { useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import getError from '../utils/error';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Layout from '../components/flyer/layout';

function LoginScreen() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/shipping');
    }
  }, [router, session, redirect]);

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      router.push('/admin/orders');
      //router.push('/admin/productinput');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
   
      <Layout title="Login"> 
      <div className='bg-white'>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Login </h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Please enter email',
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0 -9-]+.[a-zA-Z-_9]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email',
                },
              })}
              className="w-full"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Please enter Password',
                minLength: {
                  value: 6,
                  message: 'password is more than 5 chars',
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500"> {errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button className="primary-button">Login</button>
          </div>
          <div className="mb-4">
            Dont have an account?
            <Link href="/register">Register</Link>
          </div>
        </form> </div>
      </Layout>
   
  );
}

export default LoginScreen;