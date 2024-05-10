import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Pagination, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import EuropeIcon from './EuropeIcon';
import AmericasIcon from './AmericasIcon';
import AsiaIcon from './AsiaIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fetchPosts } from '@/lib/actions/authActions';


const PostsDisplay = () => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [discordCopied, setDiscordCopied] = useState(false);
  dayjs.extend(relativeTime);
  const [posts, setPosts] = useState<Post[]>([]); 

  interface Post {
    id: number;
    description: string;
    authorId: string;
    age: number | null;
    region: string | null;
    discord: string | null;
    steam: string | null;
    author: Author;
    createdAt: Date;
  }

  interface Author {
    name: string;
    image: string; 
    age: number | null;
    region: string | null;
    steam: string | null;
    discord: string | null;
    // Add any other relevant author properties here
  }

    useEffect(() => {
        const getPosts = async () => {
          const fetchedPosts = await fetchPosts(); 
          fetchedPosts.reverse(); 
          setPosts(fetchedPosts as Post[]);
        };
        getPosts();  
      }, []); 

      const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    // Calculate indices for slicing posts for the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


      const handleDiscordCopy = () => {
        setDiscordCopied(true);
        toast.success("Copied Successfully!")
        setTimeout(() => setDiscordCopied(false), 1500); // Reset after 1.5 seconds
    };
      
      const getRegionIcon = (region: any) => {
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
      {currentPosts.map((post) =>(
        <Card shadow='lg' className="max-w-[400px] m-4 bg-foreground text-white rounded-2xl border-2 border-secondary" key={post.id}>
          <CardHeader className="flex items-center gap-3"> 
              <Avatar alt="profile" src={post.author.image} />

              <div className="flex flex-col flex-1">
                  <p className='text-white text-lg font-normal'>{post.author.name}</p>
                  <Divider />
                  <div className='flex gap-2'>
                      <p className='text-sm font-light'> {post.author.age} </p>
                      <p className='pt-1'>{getRegionIcon(post.author?.region)}</p>
                  </div>
              </div>

              <div className="flex flex-row gap-2 items-end">
              {post.author.steam ? (
                  <Link href={post.author.steam}>
                      <img src='/steam.png' className='h-8 w-8 mb-4' /> 
                  </Link>
              ) : (
                  <img src='/steam.png' className='h-8 w-8 mb-4 filter brightness-50' />
              )}

              {post.author.discord ? (
            <CopyToClipboard text={post.author.discord} onCopy={handleDiscordCopy}> 
            <img src='/discord.jpg' className='h-8 w-8 mb-4 rounded-2xl cursor-pointer' />
        </CopyToClipboard>
              ) : (
                  <img src='/discord.jpg' className='h-8 w-8 mb-4 rounded-2xl filter brightness-50' />
              )}
          </div>
          </CardHeader>
          <Divider className='text-white h-0.5 bg-secondary' />
          <CardBody>
            <p>{post.description}</p>
          </CardBody>
          <CardFooter className="justify-end">
            <p className="text-sm">Posted {dayjs(post.createdAt).fromNow()}</p>
          </CardFooter>
        </Card>
      ))}
        <Pagination
            className='dark text-white'
            total={Math.ceil(posts.length / 5)}
            initialPage={1}
            onChange={handlePageChange}
        />
    </div>
  );
};

export default PostsDisplay