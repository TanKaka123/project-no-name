import { useToast } from "@chakra-ui/react";

export const showToast = (toast: any, title: string, description: string, status: "success" | "error") => {
  toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};
