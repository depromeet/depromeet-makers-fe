import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { api } from '@/apis';

interface SetDefaultPassCordRequest {
  email: string;
  passCord: string;
}

interface SetDefaultPassCordResponse extends AxiosResponse {}

const setDefaultPassCord = async (request: SetDefaultPassCordRequest) => api.post('/v1/auth/default-passcord', request);

export const useSetDefaultPassCord = (
  options?: UseMutationOptions<SetDefaultPassCordResponse, unknown, SetDefaultPassCordRequest, unknown>,
) =>
  useMutation({
    mutationFn: setDefaultPassCord,
    ...options,
  });
