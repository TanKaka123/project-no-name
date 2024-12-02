import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/router";
import { showToast } from '@/utils/showToast';

const THIRD_PARTY_INTERGRATE = [
  {
    src: "https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/",
    name: "Google"
  }
]

export const ThirdPartyAuth: React.FC = () => {
  const router = useRouter();
  const toast = useToast()
  const login = useGoogleLogin({
    onSuccess: (res) => {
      const code = res.code;
      if(!process.env.GOOGLE_REDIRECT_URL) return;
      fetch(process.env.GOOGLE_REDIRECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          sessionStorage.setItem("is_login_google", '1');
          console.log(data);
          showToast(
            toast,
            "Login Successful.",
            ".",
            "success"
          );
          router.push("/");
        })
        .catch((error) =>{
          const errorMessage = error?.message || "An unexpected error occurred.";
          showToast(toast, "Login Failed.", errorMessage, "error");
        });
    },
    flow:"auth-code",
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div id="third-party-auth" className="flex items-center justify-center mt-5 flex-wrap">
      {THIRD_PARTY_INTERGRATE.map((platform) => (
        <Button
          key={platform.name}
          className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
          variant="link"
          onClick={login}
        >
          <img
            className="max-w-[25px]"
            src={platform.src}
            alt={platform.name}
          />
        </Button>
      ))}
    </div>
  );
};

