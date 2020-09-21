import { get, put, post, deleteData } from '../utils/axios'

// 添加网站信息
export function addWebsiteinfo(reqData) {
  return post('/ent/websiteinfo', reqData)
}
// 删除网站信息
export function deleteWebsiteinfo(id) {
  return deleteData(`/ent/websiteinfo/${id}`)
}
// 更新网站信息
export function updateWebsiteinfo(reqData) {
  return put('/ent/websiteinfo', reqData)
}
// 根据ID查询网站信息
export function selectWebsiteinfoById(id) {
  return get(`/ent/websiteinfo/${id}`)
}

// 查询网站信息
export function selectWebsiteinfo(reqData) {
  return post('/ent/websiteinfo/list', reqData)
}
