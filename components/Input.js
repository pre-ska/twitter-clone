import {
  FaceSmileIcon,
  PhotoIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function Input() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput('');
    setSelectedFile();
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
  };

  return (
    <>
      {session && (
        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <img
            src={session?.user?.image}
            alt="user logo"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            onClick={() => signOut()}
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                rows="2"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide
             min-h-[50px] text-gray-700"
                placeholder="what's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {selectedFile && (
              <div className="relative group">
                {!loading && (
                  <XCircleIcon
                    onClick={() => setSelectedFile()}
                    className="h-7 m-1 text-black absolute cursor-pointer rounded-full opacity-0
                  group-hover:opacity-100 transition-opacity shadow-md shadow-white "
                  />
                )}
                <img
                  src={selectedFile}
                  className={`${loading && 'animate-pulse'}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        accept="image/*"
                      />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    disabled={!input.trim()}
                    onClick={sendPost}
                    className="bg-blue-500 text-white px-4 
          py-1.5 rounded-full font-bold shadow-md hover:brightness-95
          disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
