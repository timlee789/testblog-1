import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/flyer/layout';
import getError from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password, tel, city, address, storename, zip, state }) => {
    try {
      await axios.post('./api/auth/signup', {
        name,
        storename,
        email,
        tel,
        address,
         city,
         state,
         zip,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="storename">Store Name</label>
          <input
            type="text"
            className="w-full"
            id="storename"
            autoFocus
            {...register('storename', {
              required: 'Please enter storename',
            })}
          />
          {errors.storename && (
            <div className="text-red-500">{errors.storename.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="tel">Tel</label>
          <input
            type="tel"
            {...register('tel', {
              required: 'Please enter tel',
              
            })}
            className="w-full"
            id="tel"
          ></input>
          {errors.tel && (
            <div className="text-red-500">{errors.tel.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="address"
            {...register('address', {
              required: 'Please enter address',
             
            })}
            className="w-full"
            id="address"
          ></input>
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">city</label>
          <input
            type="city"
            {...register('city', {
              required: 'Please enter city',
             
            })}
            className="w-full"
            id="city"
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="state">state</label>
          <input
            type="state"
            {...register('state', {
              required: 'Please enter state',
             
            })}
            className="w-full"
            id="state"
          ></input>
          {errors.state && (
            <div className="text-red-500">{errors.state.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="zip">Zip</label>
          <input
            type="zip"
            {...register('zip', {
              required: 'Please enter zip',
             
            })}
            className="w-full"
            id="zip"
          ></input>
          {errors.zip && (
            <div className="text-red-500">{errors.zip.message}</div>
          )}
        </div>


        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'confirm password is more than 5 chars',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Register</button>
        </div>
      </form>
    </Layout>
  );
}