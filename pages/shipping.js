import React, { useEffect, useContext } from 'react';
import { Store } from '../utils/Store';
import CheckoutWizard from '../components/flyer/CheckoutWizard';
import Layout from '../components/flyer/layout';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

export default function ShippingScreen() {
    const {
        handleSubmit,
        register,
        formState:{errors},
        setValue,
        getValues,
    } = useForm();
    const  { state, dispatch } = useContext(Store)
    const { cart } = state;
    const { shippingAddress} = cart;
    const router = useRouter();
    useEffect(() => {
        setValue('name', shippingAddress.name);
        setValue('email', shippingAddress.address);
        setValue('tel', shippingAddress.city);
        // setValue('postalCode', shippingAddress.postalCode);
        // setValue('country', shippingAddress.country);
    },[setValue, shippingAddress])

    const submitHandler = ({name, email, tel}) => {
        // try {
        //     await axios.post('./api/auth/signup', {
        //       name,
        //       email,
        //       tel,
        //       password,
        //     });
      
        //     const result = await signIn('credentials', {
        //       redirect: false,
        //       email,
        //       password
        //     });
        //     if (result.error) {
        //       toast.error(result.error);
        //     }
        //   } catch (err) {
        //     toast.error(getError(err));
        //   }
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { name, email, tel}
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart, shippingAddress: {name, email, tel}
            })
        );
        router.push('/payment');
    }
  return (
    <Layout title="Signin As Guest">
        <CheckoutWizard activeStep={1}/>
        <form className='max=auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl text-black'>Signin As Guest</h1>
                <div className='mb-4 text-black'>
                        <label htmlFor='name'>Name</label>
                        <input className='w-full' id='name' autoFocus {...register('name', {required: 'Please enter full name'})} />
                        {errors.name && (<div className='text-red-500'>{errors.name.message}</div>)}
                </div>
                <div className='mb-4 text-black'>
                        <label htmlFor="email">Email</label>
                        <input className='w-full' id='email' 
                        {...register('email', {required: 'Please enter email', 
                        minLength: {value: 3, message: 'email is more than 2 chars'}})} />
                        {errors.email && ( <div className='text-red-500'>{errors.email.message}</div>)}
                </div>
                <div className='mb-4 text-black'>
                        <label htmlFor="tel">Tel</label>
                        <input className='w-full' id='tel' 
                        {...register('tel', {required: 'Please enter tel'} )} />
                        {errors.tel && ( <div className='text-red-500'>{errors.tel.message}</div>)}
                </div>
                {/*    <div className="mb-4">
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
        </div> */}
                <div className='mb-4 flex justify-between'>
                        <button className='primary-button'>Next</button>
                </div>

        </form>
    </Layout>
  )
}

//ShippingScreen.auth = true;