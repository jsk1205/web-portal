import { get, put, post, deleteData } from "../utils/axios";

// 添加分类
export function addCategory(reqData) {
  return post(`/ent/category/entity`,reqData);
}
// 删除分类
export function deleteCategory(id) {
  return deleteData(`/ent/category/${id}`);
}
// 更新分类
export function updateCategory(reqData) {
  return put("/ent/category", reqData);
}
// 根据ID查询分类
export function selectCategoryDetail(id) {
  return get(`/ent/category/${id}`);
}

// 查询分类集合
export function selectCategoryList(reqData) {
  return post(`/ent/category/list`,reqData);
}

