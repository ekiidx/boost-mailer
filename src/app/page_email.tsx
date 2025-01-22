"use client";
import support from "@/app/images/support.jpg";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
    // input states
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // log the user's input
        console.log({ name, email, subject, content });
    };
return (
    <main className='w-full min-h-screen flex items-center justify-between'>
        <form className='w-full' onSubmit={handleSubmit}>
            <label htmlFor='name' className='opacity-60'>
                Full Name
            </label>
            <input
                type='text'
                className='w-full px-4 py-3 border-[1px] mb-3 border-gray-300 rounded-sm'
                id='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor='email' className='opacity-60'>
                Email Address
            </label>
            <input
                type='email'
                className='w-full px-4 py-3 border-[1px] mb-3 border-gray-300 rounded-sm'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor='subject' className='opacity-60'>
                Subject
            </label>
            <input
                type='text'
                className='w-full px-4 py-3 border-[1px] mb-3 border-gray-300 rounded-sm'
                id='subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
            />

            <label htmlFor='message' className='opacity-60'>
                Message
            </label>
            <textarea
                rows={7}
                className='w-full px-4 py-3 border-[1px] mb-3 border-gray-300 rounded-sm'
                id='message'
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button className='w-full bg-blue-500 py-4 px-3 rounded-md font-bold text-blue-50'>
                SEND MESSAGE
            </button>
        </form>
    </main>
    )
}