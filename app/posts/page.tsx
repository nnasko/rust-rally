"use client"
import React, { useState } from 'react'
import PostsForm from '../components/PostsForm'
import PostsDisplay from '../components/PostsDisplay'
import { fetchPosts } from '@/lib/actions/authActions';
import {  Spacer } from '@nextui-org/react';

const page = () => {
    const [posts, setPosts] = useState([]);
  return (
    <div className='h-screen bg-background grid grid-cols-3 gap-4'>
      <div className='col-span-1'>
        <p className='pt-4 pl-4'>Create a Post</p>
        <Spacer className='h-2 w-16'/>
        <PostsForm />
      </div>
      <div className=''>
        <PostsDisplay posts={posts} setPosts={setPosts} fetchPosts={fetchPosts} />
      </div>
    </div>
  )
}

export default page