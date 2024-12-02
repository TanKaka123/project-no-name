import React from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const FormFooter: React.FC = () => {
  const router = useRouter();

  return (
    <VStack className="my-6 text-sm gap-5">
      <Text>
        <a
          className="group text-blue-400 transition-all duration-100 ease-in-out"
          href="#"
        >
          <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            Forgot password?
          </span>
        </a>
      </Text>
      <Text>
        <span className="cursor-default dark:text-gray-300">Not a member?</span>{" "}
        <Button variant={"unstyled"} onClick={()=>router.push('/sign-up')}>
          <Text className=" text-blue-400 ">Sign up</Text>
        </Button>
      </Text>
    </VStack>
  );
};
