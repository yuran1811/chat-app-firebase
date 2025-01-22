import { signOut } from 'firebase/auth';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { FC, useState } from 'react';
import Spin from 'react-cssfx-loading/src/Spin';
import { Link, useLocation } from 'react-router-dom';

import { useCollectionQuery } from '@/hooks/useCollectionQuery';
import { DEFAULT_AVATAR, IMAGE_PROXY } from '@shared/constants';
import { auth, db } from '@shared/firebase';
import { ConversationInfo } from '@shared/types';
import { useStore } from '../../store';
import ClickAwayListener from '../ClickAwayListener';
import CreateConversation from './CreateConversation';
import SelectConversation from './SelectConversation';
import UserInfo from './UserInfo';

const SideBar: FC = () => {
  const currentUser = useStore((state) => state.currentUser);

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);

  const { data, error, loading } = useCollectionQuery(
    'conversations',
    query(
      collection(db, 'conversations'),
      orderBy('updatedAt', 'desc'),
      where('users', 'array-contains', currentUser?.uid),
    ),
  );

  const location = useLocation();

  return (
    <>
      <div
        className={`h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r border-dark-lighten ${
          location.pathname !== '/' ? 'hidden w-[350px] md:!block' : 'w-full md:!w-[350px]'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-dark-lighten px-6">
          <Link to="/" className="flex items-center gap-1">
            <img className="h-8 w-8" src="/icon.svg" alt="" />
            <h1 className="ml-4 text-xl font-semibold">Chatie</h1>
          </Link>

          <div className="flex items-center gap-1">
            <button onClick={() => setCreateConversationOpened(true)} className="h-8 w-8 rounded-full bg-dark-lighten">
              <i className="bx bxs-edit text-xl"></i>
            </button>

            <ClickAwayListener onClickAway={() => setIsDropdownOpened(false)}>
              {(ref) => (
                <div ref={ref} className="relative z-10 ml-4">
                  <img
                    onClick={() => setIsDropdownOpened((prev) => !prev)}
                    className="h-8 w-8 cursor-pointer rounded-full object-cover"
                    src={currentUser?.photoURL ? IMAGE_PROXY(currentUser.photoURL) : DEFAULT_AVATAR}
                    alt=""
                  />

                  <div
                    className={`absolute top-[120%] right-0 flex w-max origin-top-right flex-col items-stretch overflow-hidden rounded-md border border-dark-lighten bg-dark p-2 shadow-lg transition-all duration-200 ${
                      isDropdownOpened ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsUserInfoOpened(true);
                        setIsDropdownOpened(false);
                      }}
                      className="flex items-center gap-1 rounded-[10px] px-3 py-1 transition duration-300 hover:bg-dark-lighten"
                    >
                      <i className="bx bxs-user text-xl"></i>
                      <span className="whitespace-nowrap">Profile</span>
                    </button>

                    <button
                      onClick={() => signOut(auth)}
                      className="flex items-center gap-1 rounded-[10px] px-3 py-1 transition duration-300 hover:bg-dark-lighten"
                    >
                      <i className="bx bx-log-out text-xl"></i>
                      <span className="whitespace-nowrap">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </ClickAwayListener>
          </div>
        </div>

        {loading ? (
          <div className="my-6 flex justify-center">
            <Spin />
          </div>
        ) : error ? (
          <div className="my-6 flex justify-center">
            <p className="text-center">Something went wrong</p>
          </div>
        ) : data?.empty ? (
          <div className="my-6 flex flex-col items-center justify-center">
            <p className="text-center">No conversation found</p>
            <button onClick={() => setCreateConversationOpened(true)} className="text-center text-primary">
              Create one
            </button>
          </div>
        ) : (
          <div>
            {data?.docs.map((item) => (
              <SelectConversation
                key={item.id}
                conversation={item.data() as ConversationInfo}
                conversationId={item.id}
              />
            ))}
          </div>
        )}
      </div>

      {createConversationOpened && <CreateConversation setIsOpened={setCreateConversationOpened} />}

      <UserInfo isOpened={isUserInfoOpened} setIsOpened={setIsUserInfoOpened} />
    </>
  );
};

export default SideBar;
