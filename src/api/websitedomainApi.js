import { get, put, post, deleteData } from '../utils/axios'

// 添加网站域名
export function addWebsitedomain(reqData) {
  return post('/ent/websitedomain', reqData)
}
// 删除网站域名
export function deleteWebsitedomain(id) {
  return deleteData(`/ent/websitedomain/${id}`)
}
// 更新网站域名
export function updateWebsitedomain(reqData) {
  return put('/ent/websitedomain', reqData)
}
// 根据ID查询网站域名
export function selectWebsitedomainById(id) {
  return get(`/ent/websitedomain/${id}`)
}

// 查询网站域名
export function selectWebsitedomain(reqData) {
  return post('/ent/websitedomain/list', reqData)
}
