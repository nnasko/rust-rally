"use client"
import React, { useState } from 'react'
import PostsForm from '../components/PostsForm'
import PostsDisplay from '../components/PostsDisplay'
import { fetchPosts } from '@/lib/actions/authActions';

const page = () => {
    const [posts, setPosts] = useState([]);
  return (
    <div className='h-screen bg-background grid grid-cols-3 gap-4'>
        <PostsForm />
        <PostsDisplay posts={posts} setPosts={setPosts} fetchPosts={fetchPosts} />
    </div>
  )
}

export default page