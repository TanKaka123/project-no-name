import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormFooter, FormInput, ThirdPartyAuth } from '@/components/common/loginPage';

type FormData = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { handleSubmit } = useForm<FormData>();

  const handleLogin = () => {
    login();
    router.push('/dashboard');
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900">
      <Box className="grid gap-8">
        <Box className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <Box className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
              LOG IN
            </h1>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <FormInput name="email" label="Email" type="email" placeholder="Email" />
              <FormInput name="password" label="Password" type="password" placeholder="Password" />
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                Log in
              </Button>
            </form>
            <ThirdPartyAuth />
            <FormFooter />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
