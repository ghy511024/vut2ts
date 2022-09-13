/**
 * create by ghy 2022/9/6 15:47
 * @desc
 */

import Download from "../out-ts/Download"
import {appInfo} from "../bean/data/appinfo";
Download.setup({isIOS: true}, appInfo);
console.log(Download.toString());