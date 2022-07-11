import { useQueryParams } from '@/hooks/useQueryParams';
import Alert from '@cpns/Alert';
import { auth } from '@shared/firebase';
import { AuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';

const SignIn: FC = () => {
  const { redirect } = useQueryParams();

  const currentUser = useStore((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setIsAlertOpened(true);
        setError(`Error: ${err.code}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser) return <Navigate to={redirect || '/'} />;

  return (
    <>
      <div className="mx-[5vw] my-5 flex justify-center lg:my-10">
        <div className="w-full max-w-[1100px]">
          <div className="flex justify-center pt-6">
            <img className="h-12 w-12 sm:h-16 sm:w-16" src="/icon.svg" alt="" />
            <span className="ml-4 text-4xl font-bold sm:text-6xl">Chatie</span>
          </div>

          <div className="flex flex-col-reverse gap-10 md:mt-5 md:flex-row md:gap-5 lg:mt-10">
            <div className="mx-auto mt-12 flex max-w-[500px] flex-1 flex-col items-center gap-4 lg:mt-24">
              <h1 className="text-center text-3xl md:text-left md:text-4xl">
                The best way for hanging out
              </h1>
              <p className="text-center text-xl md:text-left md:text-2xl">
                Much friends, much funs
              </p>

              <button
                disabled={loading}
                onClick={() => handleSignIn(new GoogleAuthProvider())}
                className="mt-4 flex min-w-[250px] cursor-pointer items-center gap-3 rounded-[12px] bg-white px-6 py-4 text-black transition duration-300 hover:brightness-90 disabled:!cursor-default disabled:!brightness-75"
              >
                <img className="h-6 w-6" src="/google.svg" alt="" />

                <span className="text-center text-xl font-semibold">Sign In With Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Alert isOpened={isAlertOpened} setIsOpened={setIsAlertOpened} text={error} isError />
    </>
  );
};

export default SignIn;
