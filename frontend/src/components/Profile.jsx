import React from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/states";
import { Mail } from 'lucide-react';

export default function Profile() {
  const { userName, userEmail } = useRecoilValue(userState);

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white text-black shadow-lg rounded-lg overflow-hidden">
    <div className="px-6 py-8 flex items-center">
      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-4xl font-bold text-white">
          {userName[0].toUpperCase()}
        </span>
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-semibold text-black">{userName}</h2>
        <div className="flex items-center text-gray-500 mt-2">
          <Mail className="w-5 h-5 mr-2" />
          <span>{userEmail}</span>
        </div>
      </div>
    </div>
  </div>
  
  );
}
