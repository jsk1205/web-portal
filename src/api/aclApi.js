import { get, put, post, deleteData } from "../utils/axios";

// 添加访问控制
export function addAcl(objId, principalType, principalIds) {
  return post(`/ent/acl/${objId}/${principalType}/${principalIds}`);
}
// 删除访问控制
export function deleteAcl(id) {
  return deleteData(`/ent/acl/${id}`);
}
// 更新访问控制
export function updateAcl(reqData) {
  return put("/ent/acl", reqData);
}
// 根据ID查询访问控制
export function selectAclById(id) {
  return get(`/ent/acl/${id}`);
}

// 查询访问控制
export function selectAcl(reqData) {
  return post(`/ent/acl/list`, reqData);
}

// 分页查询访问控制
export function selectAclByPage(page, size, objId) {
  return post(`/ent/acl/pages/${page}/${size}/${objId}`);
}
