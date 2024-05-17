import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

interface SetDefaultPassCordRequest {
  email: string;
  passCord: string;
}

interface SetDefaultPassCordResponse extends AxiosResponse {}

const setDefaultPassCord = async (request: SetDefaultPassCordRequest) =>
  await api.post<SetDefaultPassCordResponse>('/v1/auth/default-passcord', request);

export const useSetDefaultPassCord = (
  options?: UseMutationOptions<SetDefaultPassCordResponse, CustomError, SetDefaultPassCordRequest>,
) =>
  useMutation({
    mutationFn: setDefaultPassCord,
    ...options,
  });
