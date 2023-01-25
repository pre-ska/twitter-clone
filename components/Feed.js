import { SparklesIcon } from '@heroicons/react/24/outline';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

import Input from './Input';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => setPosts(snapshot.docs)
    );

    return () => unsubscribe();
  }, []);

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
