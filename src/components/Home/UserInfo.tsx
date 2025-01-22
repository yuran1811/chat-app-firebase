import { FC } from 'react';

import { IMAGE_PROXY } from '@shared/constants';
import { useStore } from '../../store';

interface UserInfoProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}

const UserInfo: FC<UserInfoProps> = ({ isOpened, setIsOpened }) => {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div
      onClick={() => setIsOpened(false)}
      className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300 ${
        isOpened ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className="mx-2 w-full max-w-[420px] rounded-lg bg-dark">
        <div className="flex items-center justify-between border-b border-dark-lighten py-3 px-3">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="whitespace-nowrap text-center text-2xl font-semibold">Your Profile</h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button
              onClick={() => setIsOpened(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-lighten"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={IMAGE_PROXY(currentUser?.photoURL as string)}
              alt=""
            />
            <div className="pb-2">
              <h1 className="p-2 text-center text-2xl font-bold">{currentUser?.displayName}</h1>
              <div className="mt-2 px-4">
                <p>ID: {currentUser?.uid}</p>
                {!!currentUser?.email && <p>Email: {currentUser.email}</p>}
                {!!currentUser?.phoneNumber && <p>Phone Number: {currentUser.phoneNumber}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
