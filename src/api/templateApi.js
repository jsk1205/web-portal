import { get, put, post, deleteData } from '../utils/axios'

// 添加模板
export function addTemplate(reqData) {
  return post('/ent/template', reqData)
}
// 删除模板
export function deleteTemplate(id) {
  return deleteData(`/ent/template/${id}`)
}
// 更新模板
export function updateTemplate(reqData) {
  return put('/ent/template', reqData)
}
// 根据ID查询模板
export function selectTemplateById(id) {
  return get(`/ent/template/${id}`)
}
// 分页查询模板
export function selectTemplate(page, size, reqData) {
  return post(`/ent/template/page/${page}/${size}`, reqData)
}

// 域管理查询模板集合
export function selectTemplateListByDomain(reqData) {
  return post(`/ent/template/list/domain`, reqData)
}

// 平台查询模板集合
export function selectTemplateListByPlatform(reqData) {
  return post(`/ent/template/list/platform`, reqData)
}

// 根据应用生成模板
export function addTemplateByApp(appId, fullCname, platFormId, domain) {
  return post(`/ent/template/${platFormId}/${appId}/${fullCname}/${domain}`)
}

