import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
                if (data.success) {
                    console.log(data.token);
                    setAToken(data.token);
                }
            } else {
                // Add doctor login logic if necessary
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <div className='mb-3'>
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            type='email'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            type='password'
                            required
                        />
                    </div>
                    <button className='bg-primary text-white w-full py-2 rounded-md text-base mb-1'>
                        Login
                    </button>
                </div>
                <p className='text-center w-full'>
                    {state === 'Admin' ? (
                        <>Doctor Login? <span className='text-primary cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></>
                    ) : (
                        <>Admin Login? <span className='text-primary cursor-pointer' onClick={() => setState('Admin')}>Click here</span></>
                    )}
                </p>
            </div>
        </form>
    );
};

export default Login;