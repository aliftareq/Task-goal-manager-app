import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Login = () => {
    //context value 
    const { signIn, LoginWithGoogle } = useContext(AuthContext)
    //states
    const [loginError, setloginError] = useState()



    //navigation
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    //react form hook
    const { register, formState: { errors }, handleSubmit } = useForm()

    //handlers
    const handleLogin = (data) => {

        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user);
                setloginError('')
                navigate(from, { replace: true })
                toast.success('Successfully logged in')

            })
            .catch(err => {
                console.error(err)
                setloginError(err.message)
            })
    }

    //handler for social login
    const handleGoogleSignIn = () => {
        LoginWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
                toast.success('successfully sign-In with google')
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    }

    return (
        <section className='flex justify-center items-center'>
            <div className='w-72 lg:w-2/5 shadow-lg px-5 lg:px-10 py-5 rounded-lg my-10 bg-slate-900'>
                <h1 className='text-4xl text-center text-white'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">E-mail</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            placeholder="example@gmail.com"
                            className="input input-bordered w-full rounded"
                        />
                        {errors.email && <p className='text-red-400' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input type="password"
                            placeholder="*******"
                            className="input input-bordered w-full rounded"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password Must be 6 Character or longer' },

                            })} />
                        {errors.password && <p className='text-red-400' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text text-white">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn bg-amber-500 hover:bg-amber-400 w-full rounded py-2' value='Login' type="submit" />
                    <div>
                        {loginError && <p className='text-red-400'>{loginError}</p>}
                    </div>
                </form>
                <p className='text-center text-white mt-3'>New to Task Goal ?
                    <span className='text-yellow-300  ml-2 underline block lg:inline'>
                        <Link to='/sign-up'>Create new account</Link>
                    </span>
                </p>
                <div className="divider text-center bg-white rounded-2xl">OR</div>
                <button onClick={handleGoogleSignIn} className='bg-amber-500 hover:bg-amber-400  w-full rounded mt-3 py-2'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Login;