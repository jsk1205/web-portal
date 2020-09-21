import { get, put, post } from "../utils/axios";

// 更新费率
export function updateRate(reqData) {
  return put("/ent/rate", reqData);
}
// 查询费率
export function selectRate(page, size) {
  return get(`/ent/rate/page/${page}/${size}`);
}

// 同步应用信息
export function syncAppMsg() {
  return post(`/ent/rate/sync`);
}

export default {
  updateRate,
  selectRate,
  syncAppMsg
}