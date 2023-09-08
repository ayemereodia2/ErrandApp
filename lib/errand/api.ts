import { _fetch } from "../../services/axios/http";

export async function fetchMyErrands() {
  const _rs = await _fetch({ method: 'GET', _url: `/user/errands` });

  return await _rs.json()
}