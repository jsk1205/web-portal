import { get, put, post, deleteData } from '../utils/axios'

// 注册平台
export function registerPlatform(reqData) {
  return post('/ent/platform/logon', reqData)
}

// 添加平台
export function addPlatform(reqData) {
  return post('/ent/platform', reqData)
}
// 删除平台
export function deletePlatform(id) {
  return deleteData(`/ent/platform/${id}`)
}
// 更新平台
export function updatePlatform(reqData) {
  return put('/ent/platform', reqData)
}
// 根据ID查询平台
export function selectPlatformById(id) {
  return get(`/ent/platform/${id}`)
}
// 分页查询平台
export function selectPlatform(page, size, reqData) {
  return post(`/ent/platform/page/${page}/${size}`, reqData)
}
// 查询平台集合
export function selectPlatformList(reqData) {
  return post(`/ent/platform/list`, reqData)
}

// 审核通过
export function platformPass(id) {
  return get(`/ent/platform/pass/${id}`)
}

// 审核拒绝
export function platformRefuse(id) {
  return get(`/ent/platform/refuse/${id}`)
}
