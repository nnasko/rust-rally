"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPost } from '../../lib/actions/authActions'; 
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const PostsForm = () => {
    const { data: session, status  } = useSession({ 
        required: true,
      });
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setSubmitting(true);  
    try {
      await createPost({
        ...data,
        authorId: session?.user.id, // Associate post with logged-in user
        steam: session?.user.steam,
        discord: session?.user.discord,
        region: session?.user.region,
      });
      toast.success("Post created!"); 
      // Reset form or display a success message here 
    } catch (error) {
      toast.error('Error creating post.');  
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title:</label>
      <input id="title" {...register('title', { required: true })} />
      {errors.title && <p className="error-message">Title is required.</p>} 

      <label htmlFor="description">Description:</label>
      <textarea id="description" {...register('description', { required: true })} />
      {errors.description && <p className="error-message">Description is required.</p>} 

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostsForm; 
