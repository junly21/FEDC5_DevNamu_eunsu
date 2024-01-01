import { useMutation } from "@tanstack/react-query";

import useUserStore from "@/stores/user";

import { setLocalStorage } from "@/utils/localStorage";

import postLogin, { LoginRequest, LoginResponse } from "./queryFn";

const useLogin = () => {
  const { updateUser } = useUserStore();

  const parseUser = (data: LoginResponse) => {
    const {
      token,
      user: { _id: id, email, fullName },
    } = data;
    const { name, nickname } = JSON.parse(fullName);
    return {
      id,
      email,
      name,
      nickname,
      token,
      isLoggedIn: true,
    };
  };

  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      const user = parseUser(data);
      updateUser(user);
      setLocalStorage("token", user.token);
    },
  });
};

export default useLogin;