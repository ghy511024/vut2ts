/**
 * create by ghy 2022/9/1 12:02
 * @desc
 */
import GuessYouLike from "../input-vue/GuessYouLike"
import {houseList} from "../bean/houseData"
import {House} from "../bean/House";

GuessYouLike.setup({cateId: 14}, houseList as House[]);

console.log("xxx:", GuessYouLike.toString())