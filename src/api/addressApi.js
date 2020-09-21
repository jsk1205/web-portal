import { get, put, post } from "../utils/axios";

// 地址解析状态
export function getAddressStatus() {
  return get(`/ent/sysvar/parsestatus`);
}

// 分页查询地址解析记录
export function selectAddress(page, size,reqData) {
  return post(`/ent/area/pages/${page}/${size}`,reqData);
}

// 修改地址解析
export function updateAdress(reqData) {
  return put(`/ent/area`, reqData);
}