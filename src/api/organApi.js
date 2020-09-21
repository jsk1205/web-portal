import { get, put, post, deleteData } from '../utils/axios'

// 域管理员添加机构
export function addDomainOrg(reqData) {
  return post('/ent/org/domain', reqData)
}
// 平台添加机构
export function addPlatformOrg(reqData) {
  return post('/ent/org/platform', reqData)
}
// 根据ID删除机构
export function deleteOrg(id) {
  return deleteData(`/ent/org/mark/${id}`)
}
// 根据ID删除机构(确认删除)
export function deleteAffirmOrg(id) {
  return deleteData(`/ent/org/${id}`)
}
// 修改机构
export function updateOrg(reqData) {
  return put('/ent/org', reqData)
}
// 域管理查询机构
export function selectDomainOrg() {
  return post(`/ent/org/list/domain`)
}
// 平台查询机构
export function selectPlatformOrg() {
  return post(`/ent/org/list/platform`)
}
// 根据ID查询机构
export function selectOrgById(id) {
  return get(`/ent/org/${id}`)
}
