import { get, put, post, deleteData } from "../utils/axios";

// 添加数据项
export function addDataItem(reqData) {
  return post(`/ent/item`, reqData);
}
// 删除数据项
export function deleteDataItem(id) {
  return deleteData(`/ent/item/${id}`);
}
// 更新数据项
export function updateDataItem(reqData) {
  return put("/ent/item", reqData);
}
// 根据ID查询数据项
export function selectDataItemDetail(id) {
  return get(`/ent/item/${id}`);
}
// 查询数据项集合
export function getDataItemList(page, size, reqData) {
  return post(`/ent/item/pages/${page}/${size}`, reqData);
}

// 根据实体同步数据项
export function syncDataItem(entityId, type) {
  return get(`/ent/item/${entityId}/${type}`);
}

