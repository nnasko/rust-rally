import React, { useEffect } from 'react'
import { Avatar, Card, CardBody, CardHeader, Divider, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import AsiaIcon from './AsiaIcon';

const PostsDisplay = ({ posts, setPosts, fetchPosts }) => { 
    useEffect(() => {
        const getPosts = async () => {
          const fetchedPosts = await fetchPosts(); 
      
          // Add a console.log here:
          console.log('Fetched Posts:', fetchedPosts);
      
          setPosts(fetchedPosts);
        };
        getPosts();  
      }, []); 

      const getRegionIcon = (region) => {
        switch (region) {
          case 'Europe':
            return <EuropeIcon h={12} w={20} />;
          case 'Americas':
            return <AmericasIcon h={12} w={20} />;
          case 'Asia':
            return <AsiaIcon h={12} w={20} />;
          default:
            return null; // Return null if region is not recognized or not provided
        }
      };
      
  return (
    <div className='p-4'>
      {posts.map((post: { id: React.Key | null | undefined; author: {
        region: any; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; image: string | undefined; age: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; 
}; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) =>(
        <Card shadow='lg' className="max-w-[400px] m-4 bg-foreground text-white rounded-2xl border-2 border-secondary" key={post.id}>
          <CardHeader className="flex gap-3">
            <Avatar
              alt={post.author.name} // Assuming 'author' has a 'username' property
              src={post.author.image} // Assuming you have 'profilePicture'
            />
            <div className="flex flex-col">
                <p className='text-white text-lg font-normal'>{post.author.name}</p>
                <Divider />
                <div className='flex-row flex gap-2'>
               <p className='text-sm font-light'> {post.author.age} </p>
               <p className='pt-1'>{getRegionIcon(post.author?.region)}</p>
               </div>
            </div>
            <img src='/steam.png' className='h-8 w-8 mb-4'></img>
            <img src='/discord.jpg' className='h-8 w-8 mb-4 rounded-2xl'></img>
          </CardHeader>
          <Divider className='text-white' />
          <CardBody>
            <p>{post.description}</p>
          </CardBody>
          {/* Consider a CardFooter if you want 'Read More' or similar links */}
        </Card>
      ))}
    </div>
  );
};

export default PostsDisplay