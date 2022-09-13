let fun = new Function("str", "data", `
return (function (str, data) {
var tmpData=data||{}
        var tmp="";
            with (tmpData) {
                try {
                    tmp = eval(str);
                } catch (e) {
                    console.warn(str +"not exits in data",data,"\\n",new Error(e));
                }
            }
            return  tmp
        }
    )(str, data);
`)
import {AppInfo} from "../bean/AppInfo";

const _tmp = {
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

export default {
    expData: fun,
    setup(ctx: { isIOS: boolean }, appInfo: AppInfo) {
        let data = {}
        if (typeof _tmp["data"] == "function") {
            data = _tmp["data"]();
        }
        let methods = {}
        if (typeof _tmp["methods"] == "object") {
            methods = _tmp["methods"]
        }
        // @ts-ignore
        let setupData = _tmp.setup(...arguments);
        Object.assign(this, data, setupData, methods);
    },
    toString() {
        let str = `  <div class='download-head-index'>    <div class='OpenInAppBarWrap_tip'>      <div class='tip_content content_start'>        <i>${this.expData('appInfo.version_text', this)}：${this.expData('version', this)}</i>
        <i>${this.expData('appInfo.developer_text', this)}：${this.expData('appInfo.developer_info', this)}</i>
        <br></br>
        <i>${this.expData('appInfo.update_time_text', this)}：${this.expData('updateTime', this)}</i>
        <a href="${this.expData('appInfo.policy_link', this)}" target='_blank' class='underline'>${this.expData('appInfo.policy_text', this)}</a>
        <i class='underline show-rights'>应用权限</i>
      </div>
    </div>
    <div class='OpenInAppBarWrap'>      <div class='OpenInAppBarWrap_content'>        <h1 class='OpenInAppBarWrap_title'>          <i></i>
          <p>58同城-专享特价房源</p>
        </h1>
        <div class='OpenAppBtn'>          <div class='OpenInAppBarWrap_btnOpen btn'>立即打开</div>
          <div class='OpenInAppBarWrap_btnOpenInApp btn'>下载APP</div>
        </div>
      </div>
    </div>
  </div>
`
        return str
    }
};
