import { useAuth } from "@/contexts/AuthContext";
import { Box, Heading, Text, Spinner, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const UserProfile = () => {
  const [data, setData] = useState<{ ID: number; Email: string; CreatedAt: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");

        const response = await fetch("https://ky3iceyq67oaavnqyt75lde2g40zviif.lambda-url.ap-southeast-1.on.aws/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }

        const result: { ID: number; Email: string; CreatedAt: string } = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="teal.500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Box
        p={8}
        maxW="lg"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        className="bg-white"
      >
        <Heading as="h2" size="xl" className="text-center text-teal-500 mb-4">
          User Profile
        </Heading>
        <div className="space-y-4">
          <div>
            <Text fontWeight="bold" className="text-gray-700">
              User ID:
            </Text>
            <Text className="text-gray-500">{data?.ID}</Text>
          </div>
          <div>
            <Text fontWeight="bold" className="text-gray-700">
              Email:
            </Text>
            <Text className="text-gray-500">{data?.Email}</Text>
          </div>
          <div>
            <Text fontWeight="bold" className="text-gray-700">
              Created At:
            </Text>
            <Text className="text-gray-500">
              {data?.CreatedAt ? new Date(data.CreatedAt).toLocaleString() : "_"}
            </Text>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            colorScheme="red"
            size="md"
            onClick={logout}
            className="w-full py-2 text-white font-semibold hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </Box>
    </div>
  );
};
