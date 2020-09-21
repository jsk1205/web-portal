import { get } from "../utils/axios";

// 查询对账服务
export function selectReconcileServer(reqData) {
  return get(`/ent/daysummary/bill`,reqData);
}

export default {
  selectReconcileServer
}