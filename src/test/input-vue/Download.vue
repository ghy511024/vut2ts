<template>
  <div class="download-head-index">
    <div class="OpenInAppBarWrap_tip">
      <div class="tip_content content_start">
        <i>{{ appInfo.version_text }}：{{ version }}</i>
        <i>{{ appInfo.developer_text }}：{{ appInfo.developer_info }}</i>
        <br>
        <i>{{ appInfo.update_time_text }}：{{ updateTime }}</i>
        <a :href="appInfo.policy_link"
           target="_blank" class="underline">{{ appInfo.policy_text }}</a>
        <i class="underline show-rights">应用权限</i>
      </div>
    </div>
    <div class="OpenInAppBarWrap">
      <div class="OpenInAppBarWrap_content">
        <h1 class="OpenInAppBarWrap_title">
          <i></i>
          <p>58同城-专享特价房源</p>
        </h1>
        <div class="OpenAppBtn">
          <div class="OpenInAppBarWrap_btnOpen btn">立即打开</div>
          <div class="OpenInAppBarWrap_btnOpenInApp btn">下载APP</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {AppInfo} from "../bean/AppInfo";

export default {
  setup(ctx: { isIOS: boolean }, appInfo: AppInfo) {
    let version = appInfo.android_version
    let updateTime = appInfo.android_update_time
    if (ctx && ctx["isIOS"]) {
      version = appInfo.ios_version
      version = appInfo.ios_update_time
    }
    return {appInfo, version, updateTime}
  }
}
</script>