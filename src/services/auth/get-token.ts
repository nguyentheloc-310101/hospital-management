import requestApi from '../configs/request-api';
import { ResponseAPI } from '../type';

export async function getTokenTenantsApi(
  tenantId: string
): Promise<ResponseAPI<any>> {
  const response = await requestApi({
    url: `/auth/get-token/${tenantId}`,
    method: 'POST',
  });
  return response?.data;
}
