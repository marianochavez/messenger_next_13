import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignIn from "../../../components/SignIn";

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div className="relative">
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://github.githubassets.com/images/modules/open_graph/github-mark.png"
          alt="Profile picture"
        />

        <SignIn providers={providers} />
      </div>
    </div>
  );
};

export default SignInPage;
