import { useEffect, useState } from "react";

type UseAppwriteProps = {
  getData: () => Promise<any>;
};

const useAppWrite = ({ getData }: UseAppwriteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  //   console.log(getData, "getData");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getData();
      setPosts(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { isLoading, posts, refetch };
};

export default useAppWrite;
