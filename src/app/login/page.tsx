'use client';
import { supabase } from '@/services/supabase/supabase-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [authenticated,setAuthenticated]= useState(false);
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    const{data,error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    // console.log(error);
    if(data.user!==null && data.session!==null){
      router.push('/dashboard/treatments')
    }
    else{
      setAuthenticated(true)
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" id="username" >
              Username
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username" 
                type="text" 
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" id="password">
              Password
              <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password" 
                placeholder="Password" 
                onChange={(e) => {setPassword(e.target.value),setAuthenticated(false)}}
             />
             {password.length===0 && <p className="text-red-500 text-xs italic">Please fill the password.</p>}
             {authenticated && <p className="text-red-500 text-xs italic">Invalid password.</p>}
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSignIn}>
              Sign In
            </button>
            <li className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </li>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
