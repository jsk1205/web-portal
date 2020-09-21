<template>
  <div class="platform-model-info-class">
    <el-row>
      <el-col class="view-header">
        <div>
          <div class="view-header-image">
            <img v-if="temp4.logoUrl" class="image" :src="temp4.logoUrl" alt />
            <img v-else class="image" :src="logo" alt />
          </div>

          <div class="view-header-text">
            <span>{{ temp1.fullCname }}</span>
            <span class="text">{{ temp1.outline }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row class="view-contain">
      <el-col>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane label="基本设置" name="first">
            <div class="form-content">
              <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp1"
                label-position="right"
                label-width="120px"
                style="padding-top: 40px;"
              >
                <div class="content">
                  <div class="content-left">
                    <el-form-item prop="fullCname" label="中文名称">
                      <el-input
                        v-model="temp1.fullCname"
                        placeholder="请输入中文名称"
                      />
                    </el-form-item>
                    <el-form-item label="英文名称">
                      <el-input
                        v-model="temp1.fullEname"
                        placeholder="请输入英文名称"
                      />
                    </el-form-item>
                    <el-form-item prop="status" label="状态">
                      <div class="module-border">
                        <el-radio-group v-model="temp1.status">
                          <el-radio
                            v-for="item in appStatusFilterData"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                            @change="setAppStatusValue(item.value)"
                            >{{ item.text }}</el-radio
                          >
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="联系人姓名">
                      <el-input
                        v-model="temp1.contactName"
                        placeholder="请输入联系人姓名"
                      />
                    </el-form-item>
                    <el-form-item label="联系人电话">
                      <el-input
                        v-model="temp1.contactPhone"
                        placeholder="请输入联系人电话"
                      />
                    </el-form-item>
                  </div>
                  <div class="content-right">
                    <el-form-item label="中文简称">
                      <el-input
                        v-model="temp1.shortCname"
                        placeholder="请输入中文简称"
                      />
                    </el-form-item>

                    <el-form-item label="英文简称">
                      <el-input
                        v-model="temp1.shortEname"
                        placeholder="请输入英文简称"
                      />
                    </el-form-item>

                    <el-form-item label="联系人邮箱">
                      <el-input
                        v-model="temp1.contactEmail"
                        placeholder="请输入联系人邮箱"
                      />
                    </el-form-item>

                    <el-form-item>
                      <el-input
                        v-model="temp1.outline"
                        type="textarea"
                        :rows="5"
                        placeholder="请输入简要描述"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="form-footer">
                <el-button
                  type="primary"
                  class="affirm-btn"
                  @click="submitTemp1"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜单管理" name="second">
            <div class="manager-contain">
              <div class="content-header-search">
                <svg-icon
                  :icon-class="add_icon_name"
                  @mouseover="handleAddMouseOver"
                  @mouseleave="handleAddMouseLeave"
                  @click="handleMenuCreate"
                />
              </div>
              <div
                class="table-contain"
                style="min-height: calc(100vh - 400px);"
              >
                <el-table
                  ref="tableRef"
                  :data="menuTableData"
                  border
                  height="470"
                  stripe
                  highlight-current-row
                  style="width:100%"
                  row-key="menuId"
                  :tree-props="{
                    children: 'children',
                    hasChildren: 'children.length>0',
                  }"
                  @cell-mouse-enter="handleMouseEnter"
                  @cell-mouse-leave="handleMouseOut"
                >
                  <el-table-column
                    prop="cname"
                    label="菜单名称"
                    align="left"
                  />
                  <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                      {{ menuStatusFilters(scope.row.status) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="actionUrl"
                    label="功能地址"
                    align="center"
                  />
                  <el-table-column
                    prop="authorizationLabel"
                    label="授权标签"
                    align="center"
                  />
                  <el-table-column
                    prop="funcCategory"
                    label="功能分类"
                    align="center"
                  />
                  <el-table-column label="操作按钮" align="center">
                    <template slot-scope="scope">
                      <div>
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="add"
                          @click="handleAddMenu(scope.row)"
                        />
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="edit"
                          @click="handleEditMenu(scope.row)"
                        />
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="delete"
                          @click="handleDeleteMenu(scope.row)"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-drawer
                  ref="drawer"
                  :visible.sync="menuFormVisible"
                  direction="rtl"
                  :modal="false"
                  :show-close="false"
                  size="100%"
                  class="form-container"
                >
                  <div
                    class="form-content"
                    :style="active"
                    @mouseover="mouseOver"
                    @mouseleave="mouseLeave"
                  >
                    <el-form
                      ref="menuDataForm"
                      :rules="rules"
                      :model="menuTemp"
                      label-position="right"
                      label-width="120px"
                    >
                      <div class="content">
                        <div style="margin:auto">
                          <el-form-item prop="cname" label="中文名称">
                            <el-input
                              v-model="menuTemp.cname"
                              placeholder="请输入中文名称"
                            />
                          </el-form-item>
                          <el-form-item label="英文名称">
                            <el-input
                              v-model="menuTemp.ename"
                              placeholder="请输入英文名称"
                            />
                          </el-form-item>
                          <el-form-item label="功能地址">
                            <el-input
                              v-model="menuTemp.actionUrl"
                              placeholder="请输入功能地址"
                            />
                          </el-form-item>
                          <el-form-item label="授权标签">
                            <el-input
                              v-model="menuTemp.authorizationLabel"
                              placeholder="请输入授权标签"
                            />
                          </el-form-item>
                          <el-form-item prop="status" label="状态">
                            <el-select
                              v-model="menuTemp.status"
                              style="width:100%"
                              placeholder="请选择状态"
                              @change="setMenuStatusValue"
                            >
                              <el-option
                                v-for="item in menuStatusFilterData"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="功能分类">
                            <el-input
                              v-model="menuTemp.funcCategory"
                              placeholder="请输入功能分类"
                            />
                          </el-form-item>
                          <el-form-item label="网页元素编号">
                            <el-input
                              v-model="menuTemp.htmlId"
                              placeholder="请输入网页元素编号"
                            />
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="menuTemp.logo" />
                          </el-form-item>
                          <el-form-item label="排序">
                            <el-input v-model="menuTemp.seqno" />
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                    <div slot="footer" class="form-footer">
                      <el-button class="cancle-btn" @click="hideMenuForm()"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        class="affirm-btn"
                        @click="
                          menuFormStatus === 'create'
                            ? submitMenuFormData()
                            : updateMenuData()
                        "
                        >确认</el-button
                      >
                    </div>
                  </div>
                </el-drawer>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">
            <div class="manager-contain">
              <div class="content-header-search">
                <svg-icon
                  :icon-class="add_icon_name"
                  @mouseover="handleAddMouseOver"
                  @mouseleave="handleAddMouseLeave"
                  @click="handleRoleCreate"
                />
              </div>
              <div
                class="table-contain"
                style="min-height: calc(100vh - 410px);"
              >
                <el-table
                  :data="roleTableData"
                  border
                  height="470"
                  stripe
                  highlight-current-row
                  @cell-mouse-enter="handleMouseEnter"
                  @cell-mouse-leave="handleMouseOut"
                >
                  <el-table-column
                    prop="seqno"
                    label="序号"
                    width="300"
                    align="center"
                  />

                  <el-table-column
                    prop="name"
                    label="角色名称"
                    width="300"
                    align="center"
                  />

                  <el-table-column label="操作按钮" align="center">
                    <template slot-scope="scope">
                      <div>
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="roleMenu"
                          @click="handleAddRole(scope.row)"
                        />
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="edit"
                          @click="handleEditRole(scope.row)"
                        />
                        <svg-icon
                          style="color:#bfcbd9"
                          icon-class="delete"
                          @click="handleDeleteRole(scope.row)"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-row class="elrow-class">
                  <el-col :span="24">
                    <div class="pagination1">
                      <el-pagination
                        v-if="paginations.total > 0"
                        background
                        :page-sizes="paginations.pageSizes"
                        :page-size="paginations.pageSize"
                        :layout="paginations.layout"
                        :total="paginations.total"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                      />
                    </div>
                  </el-col>
                </el-row>
                <el-drawer
                  ref="drawer"
                  :visible.sync="roleFormVisible"
                  direction="rtl"
                  :modal="false"
                  :show-close="false"
                  size="100%"
                  class="form-container"
                >
                  <div
                    class="form-content"
                    :style="active"
                    @mouseover="mouseOver"
                    @mouseleave="mouseLeave"
                  >
                    <el-form
                      ref="roleDataForm"
                      :rules="rules"
                      :model="roleTemp"
                      label-position="right"
                      label-width="100px"
                    >
                      <div class="content">
                        <div style="margin:auto;margin-top:10%;">
                          <el-form-item prop="name" label="角色名称">
                            <el-input
                              v-model="roleTemp.name"
                              placeholder="请输入角色名称"
                            />
                          </el-form-item>

                          <el-form-item label="授权标签">
                            <el-input
                              v-model="roleTemp.authorizationLabel"
                              placeholder="请输入授权标签"
                            />
                          </el-form-item>

                          <el-form-item label="排序">
                            <el-input v-model="roleTemp.seqno" />
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                    <div slot="footer" class="form-footer">
                      <el-button class="cancle-btn" @click="hideRoleForm"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        class="affirm-btn"
                        @click="
                          roleFormStatus === 'create'
                            ? submitRoleFormData()
                            : updateRoleData()
                        "
                        >确认</el-button
                      >
                    </div>
                  </div>
                </el-drawer>
                <el-drawer
                  ref="drawer"
                  :visible.sync="roleMenuFormVisible"
                  direction="rtl"
                  :modal="false"
                  :show-close="false"
                  size="100%"
                  class="form-container"
                >
                  <div
                    class="form-content"
                    :style="active"
                    @mouseover="mouseOver"
                    @mouseleave="mouseLeave"
                  >
                    <div class="content">
                      <div style="margin:auto">
                        <el-tree
                          ref="tree"
                          :data="menuTableData"
                          show-checkbox
                          default-expand-all
                          node-key="menuId"
                          highlight-current
                          :props="defaultProps"
                          :default-checked-keys="menuIdsData"
                          @check-change="handleCheckChange"
                        />
                      </div>
                    </div>
                    <div slot="footer" class="form-footer">
                      <el-button class="cancle-btn" @click="hideRoleMenuForm()"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        class="affirm-btn"
                        @click="submnitRoleMenuData()"
                        >确认</el-button
                      >
                    </div>
                  </div>
                </el-drawer>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="访问控制" name="fourth">
            <div class="form-content">
              <div class="content">
                <div class="content-left">
                  <div class="header">
                    <svg-icon icon-class="add_gray" @click="handleAclCreate" />
                    <svg-icon
                      icon-class="delete_gray"
                      @click="handleAclDelete"
                    />
                  </div>
                  <el-table
                    :data="principalDatas"
                    border
                    stripe
                    highlight-current-row
                    style="width:100%;height:375px"
                    @selection-change="handleSelectionPrincipalChange"
                    @row-click="principalTableRowclick"
                    @cell-mouse-enter="handleMouseEnterPrincipal"
                    @cell-mouse-leave="handleMouseOutPrincipal"
                  >
                    <el-table-column type="selection" width="55" />
                    <el-table-column
                      prop="principalName"
                      label="名称"
                      width="500"
                      align="center"
                    />
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <div>
                          <svg-icon
                            style="color:#bfcbd9"
                            icon-class="edit"
                            @click="handleEditPrincipal(scope.row)"
                          />
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-dialog
                    :visible.sync="dialogFormVisible"
                    @close="dialogCloseBefore"
                  >
                    <el-select
                      v-model="principalTypeValue"
                      style="width:100%"
                      placeholder="请选择主体"
                      @change="principalTypeValueChange"
                    >
                      <el-option
                        v-for="item in principalTypeFilterData"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      />
                    </el-select>
                    <div style="height:500px">
                      <el-table
                        key="userId"
                        :data="userTableData"
                        border
                        stripe
                        highlight-current-row
                        @selection-change="handleSelectionChange"
                      >
                        <el-table-column type="selection" width="55" />
                        <el-table-column
                          property="username"
                          label="用户账号"
                          align="center"
                        />
                      </el-table>
                    </div>
                    <div slot="footer">
                      <el-button type="primary" @click="submitPrincipalCreate"
                        >确认</el-button
                      >
                      <el-button @click="dialogFormVisible = false"
                        >取消</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-dialog
                    :visible.sync="dialogFormVisible1"
                    @close="dialogCloseBefore"
                  >
                    <el-select
                      v-model="principalTypeValue"
                      style="width:100%"
                      placeholder="请选择主体"
                      @change="principalTypeValueChange"
                    >
                      <el-option
                        v-for="item in principalTypeFilterData"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      />
                    </el-select>
                    <div style="height:500px">
                      <el-table
                        key="userId"
                        :data="userTableData"
                        border
                        stripe
                        highlight-current-row
                      >
                        <el-table-column label width="220">
                          <template scope="scope">
                            <el-radio
                              v-model="userRadio"
                              :label="scope.row.userId"
                              @change.native="
                                getUserRow(scope.$index, scope.row)
                              "
                              >&nbsp</el-radio
                            >
                          </template>
                        </el-table-column>
                        <el-table-column
                          property="username"
                          label="用户账号"
                          align="center"
                        />
                      </el-table>
                    </div>
                    <div slot="footer">
                      <el-button type="primary" @click="submitPrincipalUpdate"
                        >确认</el-button
                      >
                      <el-button @click="dialogFormVisible1 = false"
                        >取消</el-button
                      >
                    </div>
                  </el-dialog>
                </div>
                <div class="content-right">
                  <div style="width:100%;margin-top:50px">
                    <div class="left-label-access">权限</div>
                    <div>
                      <el-select
                        v-model="principalTemp.accessLevel"
                        style="width: 80%;
                              height: 40px;
                              float: right;
                              line-height: 40px;
                              position: relative;
                              text-align: center;"
                        placeholder="请选择权限"
                        @change="setPrincipalAccessLevelValue"
                      >
                        <el-option
                          v-for="item in accessLevelFilterData"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </div>
                  <div style="width:100%;margin-top:100px">
                    <div class="left-label-access">创建权限</div>
                    <div class="right-label-access">
                      <el-radio-group v-model="this.principalTemp.canCreate">
                        <el-radio
                          v-for="item in yesNoFilterData"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                          @change="setPrincipalCanCreateValue(item.value)"
                          >{{ item.text }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </div>
                  <div style="width:100%;margin-top:150px">
                    <div class="left-label-access">删除权限</div>
                    <div class="right-label-access">
                      <el-radio-group v-model="this.principalTemp.canDelete">
                        <el-radio
                          v-for="item in yesNoFilterData"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                          @change="setPrincipalCanDeleteValue(item.value)"
                          >{{ item.text }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </div>
                  <div style="width:100%;margin-top:200px">
                    <div class="left-label-role">角色</div>
                    <div class="right-label-role" style="overflow-y: auto;">
                      <el-checkbox-group v-model="roleValue">
                        <el-checkbox
                          v-for="role in roleDatas"
                          :key="role.roleId"
                          :label="role.roleId"
                          >{{ role.name }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer" class="form-footer">
                <el-button
                  type="primary"
                  class="affirm-btn"
                  @click="submitPrincipalPut"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="网站信息" name="fifth">
            <div class="form-content">
              <el-form
                ref="websiteInfoDataForm"
                :rules="rules"
                :model="temp4"
                label-width="120px"
              >
                <div
                  class="content"
                  style="height: 470px;
                overflow-y: auto;"
                >
                  <div class="content-left">
                    <el-upload
                      action
                      class="div-logo-class"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-change="setAppWebsiteInfoLogo"
                      accept="image/jpg, image/jpeg, image/png"
                    >
                      <img
                        v-if="temp4.logoUrl"
                        class="logo"
                        :src="temp4.logoUrl"
                        alt
                      />
                      <img v-else class="logo" :src="logo" alt />
                    </el-upload>
                    <el-form-item prop="fullCname" label="中文名称">
                      <el-input
                        v-model="temp4.fullCname"
                        placeholder="请输入中文名称"
                      />
                    </el-form-item>
                    <el-form-item label="英文名称">
                      <el-input
                        v-model="temp4.fullEname"
                        placeholder="请输入英文名称"
                      />
                    </el-form-item>
                    <el-form-item label="公司简称">
                      <el-input
                        v-model="temp4.smsTitle"
                        placeholder="请输入公司简称"
                      />
                    </el-form-item>
                    <el-form-item label="版权信息">
                      <el-input
                        v-model="temp4.copyright"
                        placeholder="请输入版权信息"
                      />
                    </el-form-item>
                    <el-form-item label="ICP备案号">
                      <el-input
                        v-model="temp4.icpNo"
                        placeholder="请输入ICP备案号"
                      />
                    </el-form-item>
                    <el-form-item label="SMTP账号">
                      <el-input
                        v-model="temp4.smtpUsername"
                        placeholder="请输入SMTP账号"
                      />
                    </el-form-item>
                    <el-form-item label="客服QQ">
                      <el-input
                        v-model="temp4.qqNo"
                        placeholder="请输入客服QQ"
                      />
                    </el-form-item>
                    <el-form-item label="SEO关键字1">
                      <el-input
                        v-model="temp4.seoKey1"
                        placeholder="请输入SEO关键字1"
                      />
                    </el-form-item>
                    <el-form-item label="SEO关键字3">
                      <el-input
                        v-model="temp4.seoKey3"
                        placeholder="请输入SEO关键字3"
                      />
                    </el-form-item>
                    <el-form-item label="SEO关键字5">
                      <el-input
                        v-model="temp4.seoKey5"
                        placeholder="请输入SEO关键字5"
                      />
                    </el-form-item>
                  </div>
                  <div class="content-right">
                    <el-upload
                      action
                      class="div-logo-class"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-change="setAppWebsiteInfoPbqrUrl"
                      accept="image/jpg, image/jpeg, image/png"
                    >
                      <img
                        v-if="temp4.pbqrUrl"
                        class="logo"
                        :src="temp4.pbqrUrl"
                        alt
                      />
                      <img v-else class="logo" :src="logo" alt />
                    </el-upload>
                    <el-upload
                      action
                      class="div-logo-class"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-change="setAppWebsiteInfoBglgUrl"
                      accept="image/jpg, image/jpeg, image/png"
                    >
                      <img
                        v-if="temp4.bglgUrl"
                        class="logo"
                        :src="temp4.bglgUrl"
                        style="margin-left:100px"
                        alt
                      />
                      <img
                        v-else
                        class="logo"
                        :src="logo"
                        style="margin-left:100px"
                        alt
                      />
                    </el-upload>
                    <el-form-item label="中文简称">
                      <el-input
                        v-model="temp4.shortCname"
                        placeholder="请输入中文简称"
                      />
                    </el-form-item>
                    <el-form-item label="英文简称">
                      <el-input
                        v-model="temp4.shortEname"
                        placeholder="请输入英文简称"
                      />
                    </el-form-item>
                    <el-form-item label="联系电话">
                      <el-input
                        v-model="temp4.phone"
                        placeholder="请输入联系电话"
                      />
                    </el-form-item>
                    <el-form-item label="简要描述">
                      <el-input
                        v-model="temp4.outline"
                        placeholder="请输入简要描述"
                      />
                    </el-form-item>
                    <el-form-item label="SMTP服务器">
                      <el-input
                        v-model="temp4.smtpServer"
                        placeholder="请输入SMTP服务器"
                      />
                    </el-form-item>
                    <el-form-item label="SMTP密码">
                      <el-input
                        v-model="temp4.smtpPassword"
                        placeholder="请输入SMTP密码"
                      />
                    </el-form-item>
                    <el-form-item label="主题颜色">
                      <el-input
                        v-model="temp4.themeColor"
                        placeholder="请输入主题颜色"
                      />
                    </el-form-item>
                    <el-form-item label="SEO关键字2">
                      <el-input
                        v-model="temp4.seoKey2"
                        placeholder="请输入SEO关键字2"
                      />
                    </el-form-item>
                    <el-form-item label="SEO关键字4">
                      <el-input
                        v-model="temp4.seoKey4"
                        placeholder="请输入SEO关键字4"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="form-footer">
                <el-button
                  type="primary"
                  class="affirm-btn"
                  @click="submitTemp4"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="域名配置" name="sixth">
            <div class="form-content">
              <el-form
                ref="websiteDomainDataForm"
                :rules="rules"
                :model="temp5"
                label-position="right"
                label-width="100px"
                style="padding-top: 80px;"
              >
                <div class="content">
                  <div class="content-left">
                    <el-form-item label="主域名">
                      <el-input
                        v-model="temp5.domainName"
                        placeholder="请输入主域名"
                      />
                    </el-form-item>
                    <el-form-item label="H5域名">
                      <el-input v-model="temp5.h5Host" />
                    </el-form-item>
                    <el-form-item label="H5域名IP">
                      <el-input v-model="temp5.h5Ip" />
                    </el-form-item>
                  </div>
                  <div class="content-right">
                    <el-form-item label="PC域名">
                      <el-input v-model="temp5.pcHost" />
                    </el-form-item>
                    <el-form-item label="PC域名IP">
                      <el-input v-model="temp5.pcIp" />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="form-footer">
                <el-button
                  type="primary"
                  class="affirm-btn"
                  @click="submitWebsiteDoMainForm"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <svg-icon
          style="width:40px; height:40px;position: absolute;bottom: 94%;left: 96%;"
          icon-class="back"
          @click="goBack"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { selectUserByAppId } from "@/api/userApi.js";
import {
  getAppStatus,
  getAble,
  getPrincipalType,
  getAccessLevel,
  getYesno,
} from "@/api/fliterApi.js";
import { addAcl, deleteAcl, updateAcl, selectAcl } from "@/api/aclApi.js";
import {
  addMenu,
  deleteMenu,
  deleteAffirmMenu,
  updateMenu,
  selectMenuList,
} from "@/api/menuApi.js";
import {
  addRole,
  deleteRole,
  updateRole,
  selectApplicationRoleList,
  selectRoleByAppId,
} from "@/api/roleApi.js";
import { addRoleMenu, selectRoleMenuById } from "@/api/roleMenuApi.js";
import {
  addWebsiteinfo,
  updateWebsiteinfo,
  selectWebsiteinfo,
} from "@/api/websiteinfoApi.js";
import {
  addWebsitedomain,
  updateWebsitedomain,
  selectWebsitedomain,
} from "@/api/websitedomainApi.js";
import { updateApp, selectAppById } from "@/api/appApi.js";
import logoImg from "@/assets/appLogo.png";
import { setStore, getStore } from "@/utils/mUtils";
export default {
  name: "Appmanager",
  data() {
    return {
      logo: logoImg,
      activeName: "first",
      tempList: [],
      add_icon_name: "add_no",
      active: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      menuFormStatus: "",
      menuFormVisible: false,
      menuTableData: [],
      roleFormStatus: "",
      roleFormVisible: false,
      roleMenuFormVisible: false,
      roleTableData: [],
      principalTypeValue: null,
      // 需要给分页组件传的信息
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        pageSizes: [10, 15], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },

      appStatusFilterData: [],
      menuStatusFilterData: [],
      principalTypeFilterData: [],
      accessLevelFilterData: [],
      yesNoFilterData: [],
      temp1: {
        tplId: null,
        platformId: null,
        ownerType: null,
        ownerId: null,
        publisherId: null,
        fullCname: null,
        fullEname: null,
        shortCname: null,
        shortEname: null,
        domain: null,
        isBlank: null,
        version: null,
        outline: null,
        status: null,
        seqno: null,
        contactName: null,
        contactPhone: null,
        contactEmail: null,
        isDeleted: "N",
        creOperId: null,
        creOperName: null,
        creOrgId: null,
        creDate: null,
        updOperId: null,
        updOperName: null,
        updOrgId: null,
        updDate: null,
      },
      temp2: {
        approveStatus: null,
        contactEmail: null,
        contactName: null,
        contactPhone: null,
        creDate: null,
        creOperId: null,
        creOperName: null,
        creOrgId: null,
        domain: null,
        fullCname: null,
        fullEname: null,
        isBlank: null,
        isDeleted: "N",
        outline: null,
        ownerId: null,
        ownerType: null,
        platformId: null,
        publisherId: null,
        runStatus: null,
        seqno: null,
        shortCname: null,
        shortEname: null,
        tplId: null,
        updDate: null,
        updOperId: null,
        updOperName: null,
        updOrgId: null,
        version: null,
      },
      temp3: {
        approveStatus: null,
        contactEmail: null,
        contactName: null,
        contactPhone: null,
        creDate: null,
        creOperId: null,
        creOperName: null,
        creOrgId: null,
        domain: null,
        fullCname: null,
        fullEname: null,
        isBlank: null,
        isDeleted: "N",
        outline: null,
        ownerId: null,
        ownerType: null,
        platformId: null,
        publisherId: null,
        runStatus: null,
        seqno: null,
        shortCname: null,
        shortEname: null,
        tplId: null,
        updDate: null,
        updOperId: null,
        updOperName: null,
        updOrgId: null,
        version: null,
      },
      temp4: {
        id: null,
        objId: null,
        type: null,
        fullCname: null,
        fullEname: null,
        shortCname: null,
        shortEname: null,
        smsTitle: null,
        phone: null,
        copyright: null,
        outline: null,
        icpNo: null,
        smtpServer: null,
        smtpUsername: null,
        smtppassword: null,
        qqNo: null,
        themeColor: null,
        seoKey1: null,
        seoKey2: null,
        seoKey3: null,
        seoKey4: null,
        seoKey5: null,
        logoUrl: null,
        pbqrUrl: null,
        bglgUrl: null,
      },
      temp5: {
        id: null,
        objId: null,
        type: null,
        domainName: null,
        pcHost: null,
        pcIp: null,
        h5Host: null,
        h5Ip: null,
      },
      rules: {
        fullCname: [
          { required: true, message: "请输入中文名称", trigger: "blur" },
        ],
        cname: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      menuTemp: {
        actionUrl: null,
        authorizationLabel: null,
        cname: null,
        ename: null,
        funcCategory: null,
        htmlId: null,
        logo: null,
        menuId: null,
        objId: null,
        parentId: null,
        seqno: 0,
        status: null,
      },
      roleTemp: {
        authorizationLabel: null,
        name: null,
        objId: null,
        roleId: null,
        seqno: 0,
      },
      principalTemp: {
        accessLevel: null,
        id: null,
        objId: null,
        principalId: null,
        principalName: null,
        principalType: null,
        roleIds: null,
        canCreate: null,
        canDelete: null,
      },
      principalCanDelete: null,
      platformId: null,
      appId: null,
      websiteInfoViewStatus: null,
      websiteDomainViewStatus: null,
      defaultProps: {
        children: "children",
        label: "cname",
      },
      defaultCheck: [],
      roleMenuTemp: {
        menuIds: [],
        roleId: "",
      },
      menuIdsData: [],
      userTableData: [],
      principalType: "10",
      principalData: [],
      principalDatas: [],
      principalDeleteIds: [],
      roleDatas: [],
      roleValue: [],
      userRadio: null,
    };
  },
  mounted() {
    getAppStatus().then((res) => {
      this.appStatusFilterData = res.data;
    });
    getAble().then((res) => {
      this.menuStatusFilterData = res.data;
    });
    getPrincipalType().then((res) => {
      this.principalTypeFilterData = res.data;
    });
    getAccessLevel().then((res) => {
      this.accessLevelFilterData = res.data;
    });
    getYesno().then((res) => {
      this.yesNoFilterData = res.data;
    });
    this.getParams();
  },
  methods: {
    getParams() {
      this.platformId = getStore("platformId");
      this.appId = getStore("appId");
      this.getApp();
    },
    // 得到应用基本配置
    getApp() {
      selectAppById(this.appId).then((res) => {
        if (res.data != null) {
          this.temp1 = res.data;
        }
      });
    },
    // 得到网站信息
    getWebsiteinfo() {
      this.temp4.objId = this.appId;
      this.temp4.type = "A";
      selectWebsiteinfo(this.temp4).then((res) => {
        if (res.data.length > 0) {
          this.websiteInfoViewStatus = "update";
          this.temp4 = res.data[0];
        } else {
          this.websiteInfoViewStatus = "create";
        }
      });
    },
    // 得到域名信息
    getWebsiteDoMainDetail() {
      this.temp5.objId = this.appId;
      this.temp5.type = "A";
      selectWebsitedomain(this.temp5).then((res) => {
        if (res.data.length > 0) {
          this.temp5 = res.data[0];
          this.websiteDomainViewStatus = "update";
        } else {
          this.websiteDomainViewStatus = "create";
        }
      });
    },
    // 获取菜单列表
    getMenuList() {
      this.menuTemp.objId = this.appId;
      selectMenuList(this.menuTemp).then((res) => {
        this.menuTableData = res.data;
      });
    },
    // 获取角色列表
    getRoleList() {
      selectApplicationRoleList(
        this.paginations.pageIndex,
        this.paginations.pageSize,
        this.appId
      ).then((res) => {
        this.paginations.total = res.data.total;
        this.roleTableData = res.data.list;
      });
    },
    getAppRoleList() {
      selectRoleByAppId(this.appId).then((res) => {
        this.roleDatas = res.data;
      });
    },
    setAppStatusValue(event) {
      this.temp1.status = event;
    },
    setPrincipalCanCreateValue(event) {
      this.principalTemp.canCreate = event;
    },
    setPrincipalCanDeleteValue(event) {
      this.principalTemp.canDelete = event;
    },
    // 提交基本设置
    submitTemp1() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateApp(this.temp1).then((res) => {
            this.updateSuccessMsg();
            this.appId = res.data;
            setStore("appId", res.data);
            this.getApp();
          });
        }
      });
    },
    // 提交网站信息
    submitTemp4() {
      this.$refs["websiteInfoDataForm"].validate((valid) => {
        if (valid) {
          if (this.websiteInfoViewStatus === "create") {
            this.temp4.objId = this.appId;
            this.temp4.type = "A";
            addWebsiteinfo(this.temp4).then((res) => {
              if (res.data != null && res.data !== "") {
                this.temp4.id = res.data;
                this.saveSuccessMsg();
                this.getWebsiteinfo();
                this.websiteInfoViewStatus = "update";
              }
            });
          } else {
            updateWebsiteinfo(this.temp4).then(() => {
              this.updateSuccessMsg();
              this.getWebsiteinfo();
            });
          }
        }
      });
    },
    // 提交域名设置
    submitWebsiteDoMainForm() {
      if (this.websiteDomainViewStatus === "create") {
        this.temp5.objId = this.appId;
        this.temp5.type = "A";
        addWebsitedomain(this.temp5).then((res) => {
          if (res.data != null && res.data !== "") {
            this.temp5.id = res.data;
            this.saveSuccessMsg();
            this.getWebsiteDoMainDetail();
            this.websiteDomainViewStatus = "update";
          }
        });
      } else {
        updateWebsitedomain(this.temp5).then(() => {
          this.updateSuccessMsg();
          this.getWebsiteDoMainDetail();
        });
      }
    },
    submitMenuFormData() {
      this.$refs["menuDataForm"].validate((valid) => {
        if (valid) {
          if (this.menuTemp.status) {
            this.menuTemp.objId = this.appId;
            addMenu(this.menuTemp).then(() => {
              this.saveSuccessMsg();
              this.menuFormVisible = false;
              this.resetMenuTemp();
              this.getMenuList();
            });
          } else {
            this.$message({
              message: "请选择状态",
              type: "error",
              duration: 3 * 1000,
            });
          }
        }
      });
    },
    submitRoleFormData() {
      this.$refs["roleDataForm"].validate((valid) => {
        if (valid) {
          this.roleTemp.objId = this.appId;
          addRole(this.roleTemp).then(() => {
            this.saveSuccessMsg();
            this.roleFormVisible = false;
            this.getRoleList();
            this.resetRoleTemp();
          });
        }
      });
    },
    setMenuStatusValue(event) {
      this.menuTemp.status = event;
    },
    setPrincipalAccessLevelValue(event) {
      this.principalTemp.accessLevel = event;
    },
    // 打开菜单管理表单
    handleMenuCreate() {
      this.menuFormStatus = "create";
      this.menuFormVisible = true;
    },
    // 打开角色管理表单
    handleRoleCreate() {
      this.roleFormStatus = "create";
      this.roleFormVisible = true;
    },
    handleAclCreate() {
      this.dialogFormVisible = true;
    },
    handleAclDelete() {
      deleteAcl(this.principalDeleteIds).then(() => {
        this.getPrincipalList();
      });
    },
    resetMenuTemp() {
      this.menuTemp = {
        actionUrl: null,
        authorizationLabel: null,
        cname: null,
        ename: null,
        funcCategory: null,
        htmlId: null,
        logo: null,
        menuId: null,
        objId: null,
        parentId: null,
        seqno: 0,
        status: null,
      };
    },
    resetRoleTemp() {
      this.roleTemp = {
        authorizationLabel: null,
        name: null,
        objId: null,
        roleId: null,
        seqno: 0,
      };
    },
    resetRoleMenuTemp() {
      this.menuIdsData = [];
      this.roleMenuTemp = {
        menuIds: [],
        roleId: "",
      };
    },
    handleAddMenu(row) {
      this.resetMenuTemp();
      this.menuTemp.parentId = row.menuId;
      this.menuFormStatus = "create";
      this.menuFormVisible = true;
    },
    handleEditMenu(row) {
      this.menuTemp = row;
      this.menuFormStatus = "update";
      this.menuFormVisible = true;
    },
    handleEditPrincipal(row) {
      this.dialogFormVisible1 = true;
      if (row.principalType === 10) {
        this.principalTypeValue = "10";
        this.getUserList();
      }
    },
    handleDeleteMenu(row) {
      this.$confirm("是否确定删除此菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteMenu(row.menuId).then((res) => {
            if (res.code === 1402) {
              this.$confirm(res.message + ", 是否继续删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
              })
                .then(() => {
                  deleteAffirmMenu(row.menuId).then(() => {
                    this.deleteSuccessMsg();
                    this.getMenuList();
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
            } else if (res.code === 1200) {
              this.deleteSuccessMsg();
              this.getMenuList();
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },
    updateMenuData() {
      this.$refs["menuDataForm"].validate((valid) => {
        if (valid) {
          updateMenu(this.menuTemp).then(() => {
            this.updateSuccessMsg();
            this.menuFormVisible = false;
            this.resetMenuTemp();
            this.getMenuList();
          });
        }
      });
    },
    submnitRoleMenuData() {
      addRoleMenu(this.roleMenuTemp.roleId, this.roleMenuTemp.menuIds).then(
        () => {
          this.saveSuccessMsg();
          this.roleMenuFormVisible = false;
          this.resetRoleMenuTemp();
        }
      );
    },
    handleAddRole(row) {
      this.roleMenuFormVisible = true;
      this.roleMenuTemp.roleId = row.roleId;
      selectRoleMenuById(row.roleId).then((res) => {
        this.menuIdsData = res.data;
      });
    },
    handleEditRole(row) {
      this.roleTemp = row;
      this.roleFormStatus = "update";
      this.roleFormVisible = true;
    },
    handleDeleteRole(row) {
      this.$confirm("是否确定删除此角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteRole(row.roleId).then(() => {
            this.deleteSuccessMsg();
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },
    updateRoleData() {
      this.$refs["roleDataForm"].validate((valid) => {
        if (valid) {
          updateRole(this.roleTemp).then(() => {
            this.updateSuccessMsg();
            this.roleFormVisible = false;
            this.resetRoleTemp();
            this.getRoleList();
          });
        }
      });
    },
    handleCheckChange(data, checked) {
      if (checked) {
        this.roleMenuTemp.menuIds.push(data.menuId);
      }
    },
    hideMenuForm() {
      this.menuFormVisible = false;
      this.resetMenuTemp();
      this.$nextTick(() => {
        this.$refs["menuDataForm"].clearValidate();
      });
    },
    hideRoleForm() {
      this.roleFormVisible = false;
      this.resetRoleTemp();
      this.$nextTick(() => {
        this.$refs["roleDataForm"].clearValidate();
      });
    },
    hideRoleMenuForm() {
      this.roleMenuFormVisible = false;
      this.resetRoleMenuTemp();
    },
    mouseOver() {
      this.active =
        "box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);";
    },
    mouseLeave() {
      this.active = "";
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getRoleList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getRoleList();
    },

    // 鼠标移动改变加号颜色
    handleAddMouseOver() {
      this.add_icon_name = "add_yes";
    },
    handleAddMouseLeave() {
      this.add_icon_name = "add_no";
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#42b983";
      cell.children[0].children[0].children[1].style.color = "#64d9d6";
      cell.children[0].children[0].children[2].style.color = "#f56c6c";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
      cell.children[0].children[0].children[1].style.color = "#bfcbd9";
      cell.children[0].children[0].children[2].style.color = "#bfcbd9";
    },
    handleMouseEnterPrincipal: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#42b983";
    },
    handleMouseOutPrincipal: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
    },
    appStatusFilters(value) {
      let data = "";
      this.appStatusFilterData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    appStatusFiltersReverse(value) {
      let data = "";
      this.appStatusFilterData.map(function(item) {
        if (value === item.text) {
          data = item.value;
        }
      });
      return data;
    },
    menuStatusFilters(value) {
      let data = "";
      this.menuStatusFilterData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    principalTypeValueChange() {
      if (this.principalTypeValue === 10) {
        this.getUserList();
      }
    },
    getUserList() {
      selectUserByAppId(this.appId).then((res) => {
        this.userTableData = res.data;
      });
    },
    getPrincipalList() {
      selectAcl({ objId: this.appId }).then((res) => {
        this.principalDatas = res.data;
      });
    },
    dialogCloseBefore() {
      this.principalTypeValue = null;
      this.userTableData = null;
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        var data = [];
        for (var i = 0; i < val.length; i++) {
          data.push(val[i].userId);
        }
        this.principalData = data;
      }
    },
    handleSelectionPrincipalChange(val) {
      if (val.length > 0) {
        var data = [];
        for (var i = 0; i < val.length; i++) {
          data.push(val[i].id);
        }
        this.principalDeleteIds = data;
      }
    },
    principalTableRowclick(row) {
      this.getAppRoleList();
      this.principalTemp = row;
      this.roleValue = this.principalTemp.roleIds.split(",");
    },
    submitPrincipalCreate() {
      addAcl(this.appId, this.principalType, this.principalData).then(() => {
        this.saveSuccessMsg();
        this.getPrincipalList();
        this.dialogFormVisible = false;
      });
    },
    submitPrincipalPut() {
      this.principalTemp.roleIds = this.roleValue.join();
      updateAcl(this.principalTemp).then(() => {
        this.updateSuccessMsg();
        this.getPrincipalList();
      });
    },
    checkImg(file) {
      let fileSize = 0;
      const fileMaxSize = 5 * 1024 * 1024;
      if (file) {
        fileSize = file.size;
        if (fileSize > fileMaxSize) {
          alert("文件大小不能大于5M！");
          file.value = "";
          return false;
        } else if (fileSize <= 0) {
          alert("文件大小不能为0M！");
          file.value = "";
          return false;
        }
      } else {
        return false;
      }
      return true;
    },
    setAppWebsiteInfoLogo(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        const that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.target.result;
          that.temp4.logoUrl = imgFile;
        };
      }
    },
    setAppWebsiteInfoBglgUrl(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        var that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.currentTarget.result;
          that.temp4.bglgUrl = imgFile;
        };
      }
    },
    setAppWebsiteInfoPbqrUrl(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        var that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.currentTarget.result;
          that.temp4.pbqrUrl = imgFile;
        };
      }
    },
    saveSuccessMsg() {
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    deleteSuccessMsg() {
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
    updateSuccessMsg() {
      this.$message({
        type: "success",
        message: "修改成功!",
      });
    },
    goBack() {
      this.$emit("showPlatFormInfo");
    },
    getUserRow(index, row) {
      this.principalTemp.principalId = row.userId;
      this.principalTemp.principalName = row.username;
    },
    submitPrincipalUpdate() {
      updateAcl(this.principalTemp).then(() => {
        this.dialogFormVisible1 = false;
        this.updateSuccessMsg();
        this.getPrincipalList();
      });
    },
    handleTabClick(tab) {
      if (tab.name === "first") {
        this.getApp();
      } else if (tab.name === "second") {
        this.getMenuList();
      } else if (tab.name === "third") {
        this.getMenuList();
        this.getRoleList();
      } else if (tab.name === "fourth") {
        this.getPrincipalList();
        this.getAppRoleList();
      } else if (tab.name === "fifth") {
        this.getWebsiteinfo();
      } else if (tab.name === "sixth") {
        this.getWebsiteDoMainDetail();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
