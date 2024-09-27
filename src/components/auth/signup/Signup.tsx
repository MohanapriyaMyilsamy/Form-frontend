"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const validateUsername = (username: any) => {
        return username.length >= 3;
    };

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: any) => {
        return password.length >= 6;
    };

    async function signupUser(userData: any) {
        const apiUrl = `http://localhost:5000/signup`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const responseData = await response.json();
            console.log('API Response', responseData);

            router.push('/routing/login');
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

    const onSubmit = async (e: any) => {
        e.preventDefault();

        let valid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required.';
            valid = false;
        } else if (!validateUsername(formData.username)) {
            newErrors.username = 'Please enter a valid Username.';
            valid = false;
        }

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
            await signupUser(formData);
        }
    };

    return (
        <form onSubmit={onSubmit} className='flex items-center justify-center h-screen'>
            <div className='flex flex-col gap-y-2.5 w-2/6 items-center border-2 border-teal-400 rounded-md'>
                <h2 className='font-bold not-italic text-2xl text-violet-800 mt-4'>Registeration Form</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className='border-2 border-fuchsia-400 rounded-md outline-none w-4/6 h-10 text-black mt-4'
                />
                {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className='border-2 border-fuchsia-400 rounded-md outline-none w-4/6 h-10 text-black'
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className='border-2 border-fuchsia-400 rounded-md outline-none w-4/6 h-10 text-black'
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                <button type="submit" className="border border-purple-600 px-10 py-2 mt-4 text-lg bg-purple-500">Sign Up</button>
                <Link href="/routing/login" className='text-lg mt-2 text-stone-400 hover:text-fuchsia-500 mb-4'>Already have an account? <span>Login</span></Link>
            </div>
        </form>
    );
};

export default Signup;
