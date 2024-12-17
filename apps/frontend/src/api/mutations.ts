import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './data.ts';
import { checkAuthQueryOptions } from './queries.ts';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: api.register
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries(checkAuthQueryOptions);
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.setQueryData(checkAuthQueryOptions.queryKey, (oldData) => {
        return {
          ...oldData,
          authenticated: false
        };
      });
    }
  });
};
