import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/authService";
import { useAppDispatch } from "./useAppDispatch";
import { loginSuccess } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (token, { email }) => {
      const user = { email, token };
      dispatch(loginSuccess(user));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/welcome");
    },
  });
};
