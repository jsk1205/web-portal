import { get } from '../utils/axios'

// 应用状态
export function getAppStatus() {
  return get('/ent/sysvar/applicationstatus')
}

// 领域范围
export function getDomain() {
  return get('/ent/sysvar/domain')
}
// 实体类型
export function getEntityType() {
  return get('/ent/sysvar/entitytype')
}
// 数据类型
export function getDataType() {
  return get('/ent/sysvar/datatype')
}

// 平台状态
export function getPlateformStatus() {
  return get('/ent/sysvar/platformstatus')
}

// 存取权限
export function getAccessLevel() {
  return get('/ent/sysvar/accesslevel')
}

// 分类类型
export function getCategoryType() {
  return get('/ent/sysvar/categorytype')
}

// 主体类型
export function getPrincipalType() {
  return get('/ent/sysvar/principaltype')
}

// 模板状态
export function getTemplateStatus() {
  return get('/ent/sysvar/templatestatus')
}

// 用户级别
export function getUserAccess() {
  return get('/ent/sysvar/useraccess')
}

// 用户状态
export function getUserStatus() {
  return get('/ent/sysvar/userstatus')
}

// 用户类别
export function getUserType() {
  return get('/ent/sysvar/usertype')
}

// 通用是否
export function getYesno() {
  return get('/ent/sysvar/yesno')
}

// 通用启停
export function getAble() {
  return get('/ent/sysvar/able')
}

//反馈消息类型
export function getFeedbackType() {
  return get('/ent/sysvar/feedbacktype')
}
