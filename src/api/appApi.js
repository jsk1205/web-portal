import { get, put, post, deleteData } from "../utils/axios";

// 添加应用
export function addApp(reqData) {
  return post("/ent/application", reqData);
}
// 删除应用
export function deleteApp(id) {
  return deleteData(`/ent/application/${id}`);
}
// 更新应用
export function updateApp(reqData) {
  return put("/ent/application", reqData);
}
// 根据ID查询应用
export function selectAppById(id) {
  return get(`/ent/application/${id}`);
}
// 分页查询应用
export function selectApp(page, size, reqData) {
  return post(`/ent/application/page/${page}/${size}`, reqData);
}

//域管理查询应用集合
export function selectAppListByDomain(reqData) {
  return post(`/ent/application/list/domain`, reqData);
}
//平台管理查询应用集合
export function selectAppListByPlatform(reqData) {
  return post(`/ent/application/list/platform`, reqData);
}
//根据模板添加应用
export function addAppByTemplate(tplId, fullCname, platFormId, ownerType, id, name) {
  return post(`/ent/application/${platFormId}/${tplId}/${fullCname}/${ownerType}/${id}/${name}`);
}
