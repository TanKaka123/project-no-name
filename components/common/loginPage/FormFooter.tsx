import React from 'react';
import { Text, VStack } from '@chakra-ui/react';

export const FormFooter: React.FC = () => {
  return (
    <VStack className="my-6 text-sm gap-5">
      <Text>
        <a className="group text-blue-400 transition-all duration-100 ease-in-out" href="#">
          <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
          Forgot password?
          </span>
        </a>
      </Text>
      <Text>
      <span className="cursor-default dark:text-gray-300">Not a member?</span>
        <a className="group text-blue-400 transition-all duration-100 ease-in-out" href="#">
          <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
           Sign up
          </span>
        </a>
      </Text>
    </VStack>
  );
};

