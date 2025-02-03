import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './data.ts';
import { checkAuthQueryOptions, watchlistQueryOptions } from './queries.ts';

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

export const useCreateWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createWatchlist,
    onSuccess: (data) => {
      queryClient.setQueryData(watchlistQueryOptions.queryKey, (oldData) => {
        return oldData ? [data, ...oldData] : [data];
      });
    }
  });
};

export const useAddSymbolToWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.addSymbolToWatchlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries(watchlistQueryOptions);
    }
  });
};

export const useRemoveSymbolFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.removeSymbolFromWatchlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries(watchlistQueryOptions);
    }
  });
};
