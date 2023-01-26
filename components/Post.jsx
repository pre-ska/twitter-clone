import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import { db, storage } from '../firebase';

const Post = ({ post }) => {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  useEffect(() => {
    // u startu svakog posta dohvaćam kolikciju like-ova za taj post
    // to je array uid-a od korisnika koji su likeali ovaj post
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    // u nizu likeova tražim index trenutno logiranog korisnika iz sessiona
    // ako je index manji od 0, nije like-ao
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    //ako je user logiran
    if (session) {
      // ako je user već likeao post, brišem njegov uid iz likes kolekcije za taj post
      // ako nije, stvorim novi unos u likes kolekciji za taj post
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user?.uid));
      } else {
        await setDoc(doc(db, 'posts', post.id, 'likes', session?.user?.uid), {
          username: session?.user?.username,
        });
      }
    } else {
      // ako nije logiran a klikne heart...redirect na signIn page
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post')) {
      deleteDoc(doc(db, 'posts', post.id));

      // ako postoji slika u postu, obriši je
      if (post.data().image)
        deleteObject(ref(storage, `posts/${post.id}/image`));
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data().userImg}
        alt="user-img"
        referrerPolicy="no-referrer"
      />

      {/* right side */}
      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data().username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>

        {/* post text */}

        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-gray-800 text-[15px sm:text-[16px] mb-2"
        >
          {post?.data().text}
        </p>

        {/* post image */}

        <img
          // onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2"
          src={post?.data().image}
          alt=""
        />

        {/* icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatBubbleLeftIcon
              onClick={() => {
                if (!session) {
                  // signIn();
                  router.push('/auth/signin');
                } else {
                  // setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {/* {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )} */}
          </div>
          {session?.user?.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && 'text-red-600'} text-sm select-none`}
              >
                {' '}
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
