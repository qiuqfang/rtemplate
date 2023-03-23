import { useUserStore } from "@/store/user";

export const useAccessAuth = (currentAuth: string) => {
  const authorizeList = useUserStore((state) => state.authorizeList);

  return authorizeList.includes(currentAuth);
};
