import axios from 'axios'

//export let fetch = (method, url, data, forceLogin = true) => {
//return new Promise((resolve, reject) => {
//  axios({
//    ...data,
//    method: method,
//    url: url
//  }).then(response => {
//    console.log('response', response)
//    resolve(response.data)
//  }).catch(err => {
//    console.log('err.response', err.response)
//    reject(err)
//  })
//})
//}

export let fetch = (method, url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      data: data,
      method: method,
      url: url,
      timeout: 10000,
      headers: {
//    	'User-Agent': 'Fiddler',
//				'Host': '192.168.181.53:8000',
				'Content-Type': 'application/json',
//				'Content-Length': '46',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      console.log('response', response)
      resolve(response.data)
    }).catch(err => {
      console.log('err.response', err.response)
      reject(err)
    })
  })
}

export let fetchFile = (method, url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      data: data,
      method: method,
      url: url,
//    timeout: 30000,
      headers: {
      	'Authentication': data.get('token'),
				'Content-Type': 'multipart/form-data',
//				'Content-Disposition': 'form-data; name="file"; filename="apk"',
//				'Content-Length': '46',s
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
//    onUploadProgress: config
      onUploadProgress: function(progressEvent) {
      	if (progressEvent.lengthComputable) {
//    		this.gglobal.uploadProgress = progressEvent
      		console.log('进度事件是：', progressEvent)
      	}
      }
//    onUploadProgress: p => {
//    	return 100 * (p.loaded / p.total)
//    }
    }).then(response => {
      console.log('response', response)
      resolve(response.data)
    }).catch(err => {
      console.log('err.response', err.response)
      reject(err)
    })
  })
}

export let downloadFile = (method, url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      data: data,
      method: method,
      url: url + data.downurl,
//    timeout: 10000,
      headers: {
				'Content-Type': 'multipart/form-data',
//				'Content-Disposition': 'form-data; name="file"; filename="apk"',
//				'Content-Length': '46',s
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    }).then(response => {
      console.log('response', response)
      resolve(response.data)
    }).catch(err => {
      console.log('err.response', err.response)
      reject(err)
    })
  })
}

// admin登录
export let adminLogin = (data) => {
  return fetch('POST', '/api/user/login', data)
}
// admin登出
export let adminLogout = (data) => {
  return fetch('POST', '/api/user/logout', data)
}

// 查询用户信息by id
export let getUserInfoById = (data) => {
  return fetch('POST', '/api/user/query', data)
}
// 查询用户信息by dept
export let getUserInfoByDept = (data) => {
  return fetch('POST', '/api/dept/member', data)
}
// 部门成员排序
export let sortUserInfoInDept = (data) => {
  return fetch('POST', '/api/dept/member/sort', data)
}
// 新增用户信息
export let userInfoAdd = (data) => {
  return fetch('POST', '/api/user/add', data)
}
// 删除用户信息
export let userInfoDelete = (data) => {
  return fetch('POST', '/api/user/delete', data)
}
// 修改用户信息
export let userInfoUpdate = (data) => {
  return fetch('POST', '/api/user/modify', data)
}
// 修改用户的状态
export let userEnableUpdate = (data) => {
  return fetch('POST', '/api/user/enabled', data)
}
// 验证用户是否被注册
export let checkUserRegistered = (data) => {
  return fetch('POST', '/api/user/registered', data)
}

// 查询部门信息
export let getOrgInfo = (data) => {
  return fetch('POST', '/api/dept/query', data)
}
// 删除部门信息
export let deleteOrgInfo = (data) => {
  return fetch('POST', '/api/dept/delete', data)
}
// 新增部门信息
export let addOrgInfo = (data) => {
  return fetch('POST', '/api/dept/add', data)
}
// 修改部门信息
export let updateOrgInfo = (data) => {
  return fetch('POST', '/api/dept/modify', data)
}
// 子部门排序
export let sortSubOrgInfo = (data) => {
  return fetch('POST', '/api/dept/sub/sort', data)
}

// 根据用户id查询用户所在的所有群组列表
export let getDefaultGroup= (data) => {
  return fetch('POST', '/api/group/query', data)
}
// 查询群组信息by id
export let getGroupInfoById = (data) => {
  return fetch('POST', '/api/group/query/id', data)
}
// 查询群组信息
export let getGroupInfo = (data) => {
  return fetch('POST', '/api/group/query/creator', data)
}
// 新增群组信息
export let addGroupInfo = (data) => {
  return fetch('POST', '/api/group/add', data)
}
// 删除群组信息
export let deleteGroupInfo = (data) => {
  return fetch('POST', '/api/group/delete', data)
}
// 修改群组信息
export let updateGroupInfo = (data) => {
  return fetch('POST', '/api/group/modify', data)
}
// 群组排序
export let sortGroupInfo = (data) => {
  return fetch('POST', '/api/group/sort', data)
}
// 群组成员排序
export let sortGroupMemberInfo = (data) => {
  return fetch('POST', '/api/group/member/sort', data)
}

// 查询IPC组织信息 
export let getIPCDeptInfo = (data) => {
  return fetch('POST', '/api/ipc', data)
}
// 查询RTSP设备信息by dept
export let getRtspInfoByDept = (data) => {
  return fetch('POST', '/api/rtsp/device/query/dept', data)
}
// 查询RTSP设备信息by ipc code
export let checkRtspExist = (data) => {
  return fetch('POST', '/api/rtsp/device/exist', data)
}
// 新增RTSP设备信息
export let AddRtspInfo = (data) => {
  return fetch('POST', '/api/rtsp/device/add', data)
}
// 修改RTSP设备信息
export let UpdateRtspInfo = (data) => {
  return fetch('POST', '/api/rtsp/device/modify', data)
}
// 删除RTSP设备信息
export let DeleteRtspInfo = (data) => {
  return fetch('POST', '/api/rtsp/device/delete', data)
}
// RTSP设备信息排序
export let sortRtspInfo = (data) => {
  return fetch('POST', '/api/rtsp/device/sort', data)
}
// 查询sip_server服务器信息
export let getSipServerInfo = (data) => {
  return fetch('POST', '/api/sip/server/query', data)
}
// 新增sip_server服务器信息
export let addSipServerInfo = (data) => {
  return fetch('POST', '/api/sip/server/add', data)
}
// 删除sip_server服务器信息
export let deleteSipServerInfo = (data) => {
  return fetch('POST', '/api/sip/server/delete', data)
}
// 修改sip_server服务器信息
export let updateSipServerInfo = (data) => {
  return fetch('POST', '/api/sip/server/modify', data)
}
// 查询RTSP服务器信息
export let getRtspServerInfo = (data) => {
  return fetch('POST', '/api/rtsp/server/query', data)
}
// 新增RTSP服务器信息
export let addRtspServerInfo = (data) => {
  return fetch('POST', '/api/rtsp/server/add', data)
}
// 删除RTSP服务器信息
export let deleteRtspServerInfo = (data) => {
  return fetch('POST', '/api/rtsp/server/delete', data)
}
// 修改RTSP服务器信息
export let updateRtspServerInfo = (data) => {
  return fetch('POST', '/api/rtsp/server/modify', data)
}
// 查询PSTN网关信息
export let getPstnGatewayInfo = (data) => {
  return fetch('POST', '/api/pstn/gateway/query', data)
}
// 新增PSTN网关信息
export let addPstnGatewayInfo = (data) => {
  return fetch('POST', '/api/pstn/gateway/add', data)
}
// 修改PSTN网关信息
export let updatePstnGatewayInfo = (data) => {
  return fetch('POST', '/api/pstn/gateway/modify', data)
}
// 删除PSTN网关信息
export let deletePstnGatewayInfo = (data) => {
  return fetch('POST', '/api/pstn/gateway/delete', data)
}
// 查询PSTN网关的sip信息
export let getPstnSipInfo = (data) => {
  return fetch('POST', '/api/pstn/gateway/sipinfo', data)
}
// 对比会议终端信息 ？？？？
export let checkMeetingInfo = (data) => {
  return fetch('POST', '/api/siteConf/name', data)
}
// 查询会议终端信息by dept
export let getMeetingInfoByDept = (data) => {
  return fetch('POST', '/api/sip/site/query/dept', data)
}
// 新增会议终端
export let addMeetingInfo = (data) => {
return fetch('POST', '/api/sip/site/add', data)
}
// 修改会议终端信息
export let updateMeetingInfo = (data) => {
  return fetch('POST', '/api/sip/site/modify', data)
}
// 删除会议终端信息
export let deleteMeetingInfo = (data) => {
  return fetch('POST', '/api/sip/site/delete', data)
}
// 会议终端排序
export let sortMeetingInfo = (data) => {
	return fetch('POST', '/api/sip/site/sort', data)
}

// 查询sos信息
export let getSosInfoByCreator = (data) => {
  return fetch('POST', '/api/sos/query/creator', data)
}
// 删除sos信息
export let deleteSosInfo = (data) => {
  return fetch('POST', '/api/sos/delete', data)
}
// 查询签到信息
export let getSignInfoByCreator = (data) => {
  return fetch('POST', '/api/sign/query/creator', data)
}
// 删除签到信息
export let deleteSignInfo = (data) => {
  return fetch('POST', '/api/sign/delete', data)
}
// 查询标签信息
export let getLabelInfoByCreator = (data) => {
  return fetch('POST', '/api/label/query/creator', data)
}
// 删除标签信息
export let deleteLabelInfo = (data) => {
  return fetch('POST', '/api/label/delete', data)
}
// 查询任务信息
export let getTaskInfoByCreator = (data) => {
  return fetch('POST', '/api/task/query/creator', data)
}
// 删除任务信息
export let deleteTaskInfo = (data) => {
  return fetch('POST', '/api/task/delete', data)
}
// 查询IM信息
export let getIMInfo = (data) => {
  return fetch('POST', '/api/im/query/log', data)
}
// 查询取证信息
export let getEvidenceInfo = (data) => {
  return fetch('POST', '/api/evidence/query/creator', data)
}
// 删除取证信息
export let deleteEvidenceInfo = (data) => {
  return fetch('POST', '/api/evidence/delete', data)
}
// 查询通话记录信息
export let getConverseInfo = (data) => {
  return fetch('POST', '/api/sip/server/record', data)
}

// 文件上传
export let uploadFiles = (data) => {
	console.log('请求的data是：', data)
  return fetchFile('POST', '/api/public/upload', data)
}
// 文件下载
export let downloadFiles = (data) => {
	console.log('请求的data是：', data)
  return downloadFile('GET', '/api/', data)
}
// 查询应用信息
export let getApplicationInfo = (data) => {
  return fetch('POST', '/api/application/query', data)
}
// 更新应用信息
export let addApplicationInfo = (data) => {
  return fetch('POST', '/api/application/add', data)
}
// 删除版本信息
export let deleteApplicationInfo = (data) => {
  return fetch('POST', '/api/application/delete', data)
}

// 查询系统配置信息
export let getSystemConfigInfo = (data) => {
  return fetch('POST', '/api/option/query', data)
}
// 添加系统配置信息
export let addSystemConfigInfo = (data) => {
  return fetch('POST', '/api/option/add', data)
}
// 修改系统配置信息
export let updateSystemConfigInfo = (data) => {
  return fetch('POST', '/api/option/modify', data)
}
// 删除系统配置信息
export let deleteSystemConfigInfo = (data) => {
  return fetch('POST', '/api/option/delete', data)
}

// 查询系统信息
export let getAllSystemInfo = (data) => {
  return fetch('POST', '/api/system/info', data)
}

// old

// 调整群组或部门成员顺序
export let sortUserInfo = (data) => {
  return fetch('POST', '/api/user/sort', data)
}
// 获取调整后的人员顺序1
export let getSortAfterUser = (data) => {
  return fetch('POST', '/api/user/sortInfo', data)
}
// 获取调整后的人员顺序2
export let getSortAfterUserAll = (data) => {
  return fetch('POST', '/api/user/info', data)
}

// 查询监控设备信息VC
export let getVCInfo = (data) => {
  return fetch('POST', '/api/transfer/vc', data)
}
// 查询监控设备信息M
export let getMonitorInfo = (data) => {
return fetch('POST', '/api/post/device/query', data)
}
//新增监控设备
export let addMonitorInfo = (data) => {
  return fetch('POST', '/api/post/device/add', data)
}
// 修改监控设备信息
export let updateMonitorInfo = (data) => {
  return fetch('POST', '/api/post/device/modify', data)
}
// 删除监控设备信息
export let deleteMonitorInfo = (data) => {
  return fetch('POST', '/api/post/device/remove', data)
}
// 查询标记信息
export let getMarkInfo = (data) => {
  return fetch('POST', '/api/label/info', data)
}
// 新增标记信息
export let addMarkInfo = (data) => {
  return fetch('POST', '/api/label/add', data)
}
// 删除标记信息
export let deleteMarkInfo = (data) => {
  return fetch('POST', '/api/label/delete', data)
}

// 查询签到信息
export let getSignInfo = (data) => {
  return fetch('POST', '/api/sign/info', data)
}
// 新增签到信息
export let addSignInfo = (data) => {
  return fetch('POST', '/api/sign/add', data)
}