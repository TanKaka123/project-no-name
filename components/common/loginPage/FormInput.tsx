import React from 'react';
import { useFormContext, FieldValues } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

type FormInputProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, type, placeholder }) => {
  const { register, formState: { errors } } = useFormContext<FieldValues>();
  
  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name} className="dark:text-gray-400 text-lg">{label}</FormLabel>
      <Input
        id={name}
        {...register(name, { required: `${label} is required` })}
        type={type}
        placeholder={placeholder}
        className="dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
      />
      <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
      </FormControl>
  );
};

