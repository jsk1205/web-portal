import { get, put, post, deleteData } from "../utils/axios";

// 添加数据实体
export function addEntity(reqData) {
  return post(`/ent/entity`,reqData);
}
// 删除数据实体
export function deleteEntity(id) {
  return deleteData(`/ent/entity/${id}`);
}
// 更新数据实体
export function updateEntity(reqData) {
  return put("/ent/entity", reqData);
}
// 根据ID查询数据实体
export function selectEntityDetail(id) {
  return get(`/ent/entity/${id}`);
}
// 查询数据实体集合
export function getEntityList(reqData) {
  return post(`/ent/entity/list`,reqData);
}

// 查询分类及数据实体集合
export function getCategoryEntityList(objId, type) {
  return get(`/ent/entity/common/category/list/${objId}/${type}`);
}

// 查询分类及数据实体集合
export function getSystemCategoryEntityList(objId, type) {
  return get(`/ent/entity/system/category/list/${objId}/${type}`);
}