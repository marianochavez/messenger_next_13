"use client";

import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignIn = ({providers}: Props) => {
  return (
    <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignIn;
