import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/apis';

interface GerHasMemberRequest {
  email: string;
}

interface GerHasMemberResponse {
  isMemberExists: boolean;
  isPassCordAssigned: boolean;
}

export const getHasMember = async (request: GerHasMemberRequest): Promise<GerHasMemberResponse> => {
  return await api.get('/v1/auth/has-member', { params: request });
};

export const useGetHasMember = (
  request: GerHasMemberRequest,
  options?: UseQueryOptions<GerHasMemberResponse, unknown, GerHasMemberRequest>,
) =>
  useQuery<GerHasMemberResponse, unknown, GerHasMemberRequest>({
    queryKey: ['auth', 'has-member'],
    queryFn: () => getHasMember(request),
    ...options,
  });
