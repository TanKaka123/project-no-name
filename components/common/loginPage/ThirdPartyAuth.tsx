import React from 'react';
import { Button } from '@chakra-ui/react';

const THIRD_PARTY_INTERGRATE = [
  {
    src: "https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/",
    name: "Google"
  },
  {
    src: "https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/",
    name: "Linkedin"
  }
]

export const ThirdPartyAuth: React.FC = () => {
  return (
    <div id="third-party-auth" className="flex items-center justify-center mt-5 flex-wrap">
      {THIRD_PARTY_INTERGRATE.map((platform) => (
        <Button
          key={platform.name}
          className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
          variant="link"
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

