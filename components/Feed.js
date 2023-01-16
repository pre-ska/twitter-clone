import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Input from './Input';
import Post from './Post';

function Feed() {
  const posts = [
    {
      id: '1',
      name: 'pre ska',
      username: 'pre-ska',
      userImg: 'https://avatars.githubusercontent.com/u/18500014',
      img: 'https://images.unsplash.com/photo-1673376982729-21c9d3a189bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'pre ska',
      username: 'pre-ska',
      userImg: 'https://avatars.githubusercontent.com/u/18500014',
      img: 'https://images.unsplash.com/photo-1474905187624-b3deaf7aa4c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      text: 'wow',
      timestamp: '2 days ago',
    },
  ];
  return (
    <div
      className="xl:ml-[370px] border-gray-200 border-l border-r xl:min-w-xl sm:ml-[73px] flex-grow
    max-w-xl"
    >
      <div
        className="flex py-2 px-3 sticky top-0 z-50 bg-white
      border-b border-gray-200"
      >
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>

      <Input />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
