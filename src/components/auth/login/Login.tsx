"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: any) => {
        return password.length >= 6;
    };

    async function loginUser(userData: any) {
        const apiUrl = `http://localhost:5000/login`;
        console.log('apiUrl', apiUrl);

        if (!apiUrl) {
            console.error('API URL is not defined');
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Fail to submit form');
            }
            const responseData = await response.json();
            console.log('API Response', responseData);

            router.push('/routing/homepage');
        } catch (error) {
            console.log("API Error", error);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();

        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required.';
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
            valid = false;
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            await loginUser(formData);
        }
    };

    return (
        <form onSubmit={onSubmit} className='flex items-center justify-center h-screen'>
            <div className='flex flex-col gap-y-2.5 w-2/6 items-center border-2 border-teal-400 rounded-md'>
                <h2 className='font-bold not-italic text-2xl text-violet-800 mt-4'>Login Form</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className='border-2 border-fuchsia-400 rounded-md outline-none w-4/6 h-10 text-black mt-4'
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className='border-2 border-fuchsia-400 rounded-md outline-none w-4/6 h-10 text-black mt-4'
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

                <button type="submit" className="border border-purple-600 px-10 py-2 mt-4 text-lg bg-purple-500">Login</button>
                <Link href="/routing/signup" className='text-lg mt-2 text-stone-400 hover:text-fuchsia-500 mb-4'>
                    Create New Account. <span>Signup</span>
                </Link>
            </div>
        </form>
    );
};

export default Login;
