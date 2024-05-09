"use client"
import React, { useState } from 'react'
import PostsForm from '../components/PostsForm'
import PostsDisplay from '../components/PostsDisplay'
import { fetchPosts } from '@/lib/actions/authActions';
import {  Spacer } from '@nextui-org/react';

const page = () => {
    const [posts, setPosts] = useState([]);
  return (
    <div className='min-h-screen bg-background grid md:grid-cols-3 gap-4'>
      <div className='col-span-1'>
        <PostsForm />
        <Spacer className='h-1 md:hidden w-screen bg-secondary'/>
      </div>
      <div className=''>
        <PostsDisplay posts={posts} setPosts={setPosts} fetchPosts={fetchPosts} />
      </div>
    </div>
  )
}

export default page