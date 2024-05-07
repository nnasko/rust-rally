"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPost } from '../../lib/actions/authActions'; 
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Button, Spacer, Textarea } from '@nextui-org/react';

const PostsForm = () => {
    const { data: session, status  } = useSession({ 
        required: true,
      });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const maxDescriptionLength = 500;

  const handleDescriptionChange = (event: { target: { value: string; }; }) => {
    setDescription(event.target.value.substring(0, maxDescriptionLength)); 
  };


  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      await createPost({
        ...data,
        authorId: session?.user.id,
        steam: session?.user.steam,
        discord: session?.user.discord,
        region: session?.user.region,
      });
      toast.success("Post created!"); 
    } catch (error) {
      toast.error('Error creating post.');  
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='m-6 bg-foreground border-2 p-4 h-min rounded-lg'>
      <div className='dark'>
      <p className='pb-2 text-lg font-bold'>Create a Post</p>
      <Spacer className='w-16 bg-secondary mb-4'/>
      <Textarea
        label="Description"
        id="description"
        {...register('description', { required: true })}
        onChange={handleDescriptionChange} // Add this event handler
        value={description} // Bind to state 
        isRequired
      />
     {/* Show remaining characters */}
     <p className="text-xs flex-row items-end">
       {description.length}/{maxDescriptionLength}
     </p>
      <Button type="submit" disabled={submitting} className='mt-2'>
        {submitting ? 'Submitting...' : 'Create Post'}
      </Button>
      </div>
    </form>
  );
};

export default PostsForm; 
