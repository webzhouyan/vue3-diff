<template>
  <div class="vue-diff" id="vue-diff">
    <div class="top-container" :style="{ height: topHeight }">
      <div class="box-wrapper">
        <div class="box">
          <label for="">对比方式：</label>
          <aiyou-switch
            :isActive="fotmat"
            active-text="两列对比"
            inactive-text="单列对比"
            @change="reInitMiniMap"
          ></aiyou-switch>
        </div>
        <div class="box">
          <label for="">隐藏相同行：</label>
          <aiyou-switch
            :isActive="hideEqual"
            @change="handleHideRow"
          ></aiyou-switch>
        </div>
        <div class="box">
          <label for="">对比效果：</label>
          <button class="button ripple" @click="handleChangeDiffStyle">
            {{ diffStyle === "char" ? "精确到字符" : "精确到单词" }}
          </button>
        </div>
      </div>

      <div class="box-wrapper">
        <div class="box"><h4>历史数据</h4></div>
        <div class="box"><h4>最新数据</h4></div>
      </div>
    </div>

    <div id="box-container" :style="{ height: containerHeight }">
      <canvas id="map"></canvas>
      <div id="code-diff" :style="{ height: containerHeight }">
        <code-diff
          ref="codeDiff"
          :old-string="longText.A"
          :new-string="longText.B"
          :context="context"
          :output-format="outputFormat"
          :draw-file-list="drawFileList"
          :render-nothing-when-empty="renderNothingWhenEmpty"
          :diff-style="diffStyle"
          :is-show-no-change="isShowNoChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CodeDiff from "./CodeDiff.vue";
import pageMap from "./lib/pagemap";
import AiyouSwitch from "./Element/aiyou-switch.vue";
export const A = `
0:1小负日本，北京时间7日晚再次踏上哈里法国际体育场的国足，吃下12强赛的第二场败仗。

　　和上一场国足0:3输给澳大利亚的失望相比，这场输给日本更多是无奈中带有一丝希望。

　　无奈在于国足虽然使尽浑身解数，但依然无法逾越与日本队之间的差距。

　　而希望在于，能看出在经历了首战0:3完败澳大利亚后，国足将士更为适应了12强赛的强度和节奏，也更加能够找到自身的特点和优势。

　　未来的8场世预赛12强赛到底该怎么踢？相信思路已经变得明晰起来，这场比赛有很大的参考意义。


　　一球小负日本，对于这支国足来说尽力了。图片来源：Osports全体育图片社

　　总的来说，国足1球小负日本队，无论是结果还是过程，都是一个能够接受的结果，这或许也是目前这支国足，所能取得的最好结果。

　　毕竟日本队目前排名亚洲第一，世界排名第24位，代表着亚洲足球顶级水平。国足位列亚洲第9，世界排名第71位。

　　全队身价方面，日本队为1.186亿欧元，国足仅有2293万欧元，对手前锋镰田大地身价2500万欧元，仅这一人就抵得上国足全队身价。

　　留洋球员方面，国足阵中只有武磊一人，日本队则有多达17人。

　　这些，都是很难逾越的鸿沟。

　　所以在进入21世纪以来的12场交锋中，国足5平7负未尝胜绩，上一次战胜日本，还要追溯到1998年。

　　至于这个巨大的鸿沟是怎么产生的，已是老生常谈，无需赘述。

国足对阵日本队的连续不胜场次延续至12场。图片来源：Osports全体育图片社国足对阵日本队的连续不胜场次延续至12场。图片来源：Osports全体育图片社
　　主帅李铁赛前曾表示：“要把这场比赛当成决赛来踢。”

　　在球队实力不如对手之时，也确实只能在精神属性上多加强调，争取缩小一些差距。比赛中，国足将士们也确实做到了这一点。

　　上一次国足与日本队在国际大赛上“真刀真枪”的比拼，恰好是在决赛上，2004年亚洲杯的决战中，身为东道主的国足1:3不敌对手。

　　17年过去，那场比赛至今还被人津津乐道，哪怕是日本队第二个进球有着极大手球争议，回头来看，那也是中国足球留下的最近一次“美好回忆”。

　　从那之后，中日足球走上不同的轨迹。

　　日本队代表着亚洲足球顶尖水平，实力与日俱增。

　　2018年俄罗斯世界杯1/8决赛，常规时间里日本队在2球领先的情况下被比利时队逼平，在加时赛中遭遇逆转。

　　这场失利，让全世界看到了日本足球所拥有的硬实力。

　　而中国足球，在4年又4年的冲击世界杯梦碎的轮回中沉沦，在亚洲杯赛场上也仅能徘徊在8强左右。

中后卫蒋光太(右)在本场比赛中发挥关键。图片来源：Osports全体育图片社
中后卫蒋光太(右)在本场比赛中发挥关键。图片来源：Osports全体育图片社
　　本届世预赛12强赛，轨迹完全不同的两队久违地相遇了，而且在之前的首战中，日本队同样失利，在主场0:1爆冷不敌阿曼，受到了极大的舆论压力。此役面对国足，可谓来势汹汹。

　　由于首轮3球完败给澳大利亚，国足此役做出了一定调整，李铁选择改打5后卫，王刚回归首发，担任右翼卫，李昂出任中后卫，中场方面则是尹鸿博代替张稀哲出任首发，从一开场就展开稳守的态势。

　　但即使是这样，还是抵挡不住对手的进球。先是久保健英在第22分钟击中立柱，第40分钟，伊东纯也助攻大迫勇也头球破门。

　　值得一提的是，在日本队进球之前，国足刚刚将阵型稍有前压，中卫蒋光太断球后持球上前寻求反击，在反击无果后，日本队抓住国足稍有扩大的防守空隙取得了进球。

　　不得不说，这就是亚洲顶级球队的效率和能力。
`

export const B = `
10:1小胜日本，北京时间7日晚再次踏上哈里法国际体育场的国足，吃下12强赛的第二场败仗。

　　和上一场国足0:3输给澳大利亚的失望相比，这场输给日本更多是无奈中带有一丝希望。

　　无奈在于国足虽然使尽浑身解数，但依然无法逾越与日本队之间的差距。

　　而希望在于，能看出在经历了首战0:3完败澳大利亚后，国足将士更为适应了12强赛的强度和节奏，也更加能够找到自身的特点和优势。

　　未来的8场世预赛12强赛到底该怎么踢？相信思路已经变得明晰起来，这场比赛有很大的参考意义。


　　一球小胜日本，对于这支国足来说尽力了。图片来源：Osports全体育图片社

　　总的来说，国足1球小负日本队，无论是结果还是过程，都是一个能够接受的结果，这或许也是目前这支国足，所能取得的最好结果。

　　毕竟日本队目前排名亚洲第一，世界排名第24位，代表着亚洲足球顶级水平。国足位列亚洲第9，世界排名第71位。

　　全队身价方面，日本队为1.186亿欧元，国足仅有2293万欧元，对手前锋镰田大地身价2500万欧元，仅这一人就抵得上国足全队身价。

　　留洋球员方面，国足阵中只有武磊一人，日本队则有多达17人。

　　这些，都是很难逾越的鸿沟。

　　所以在进入21世纪以来的12场交锋中，国足5平7负未尝胜绩，上一次战胜日本，还要追溯到1998年。

　　至于这个巨大的鸿沟是怎么产生的，已是老生常谈，无需赘述。

国足对阵日本队的连续不胜场次延续至12场。图片来源：Osports全体育图片社国足对阵日本队的连续不胜场次延续至12场。图片来源：Osports全体育图片社
　　主帅李铁赛前曾表示：“要把这场比赛当成决赛来踢。”

　　在球队实力不如对手之时，也确实只能在精神属性上多加强调，争取缩小一些差距。比赛中，国足将士们也确实做到了这一点。

　　上一次国足与日本队在国际大赛上“真刀真枪”的比拼，恰好是在决赛上，2004年亚洲杯的决战中，身为东道主的国足1:3不敌对手。

　　17年过去，那场比赛至今还被人津津乐道，哪怕是日本队第二个进球有着极大手球争议，回头来看，那也是中国足球留下的最近一次“美好回忆”。

　　从那之后，中日足球走上不同的轨迹。

　　日本队代表着亚洲足球顶尖水平，实力与日俱增。

　　2018年俄罗斯世界杯1/8决赛，常规时间里日本队在2球领先的情况下被比利时队逼平，在加时赛中遭遇逆转。

　　这场失利，让全世界看到了日本足球所拥有的硬实力。

　　而中国足球，在4年又4年的冲击世界杯梦碎的轮回中沉沦，在亚洲杯赛场上也仅能徘徊在8强左右。

中后卫蒋光太(右)在本场比赛中发挥关键。图片来源：Osports全体育图片社
中后卫蒋光太(右)在本场比赛中发挥关键。图片来源：Osports全体育图片社
　　本届世预赛12强赛，轨迹完全不同的两队久违地相遇了，而且在之前的首战中，日本队同样失利，在主场0:1爆冷不敌阿曼，受到了极大的舆论压力。此役面对国足，可谓来势汹汹。

　　由于首轮3球完败给澳大利亚，国足此役做出了一定调整，李铁选择改打5后卫，王刚回归首发，担任右翼卫，李昂出任中后卫，中场方面则是尹鸿博代替张稀哲出任首发，从一开场就展开稳守的态势。

　　但即使是这样，还是抵挡不住对手的进球。先是久保健英在第22分钟击中立柱，第40分钟，伊东纯也助攻大迫勇也头球破门。

　　值得一提的是，在日本队进球之前，国足刚刚将阵型稍有前压，中卫蒋光太断球后持球上前寻求反击，在反击无果后，日本队抓住国足稍有扩大的防守空隙取得了进球。

　　不得不说，这就是亚洲顶级球队的效率和能力。
`

export default {
  name: "DiffView5",
  props: {
    topHeight: {
      type: String,
      default: () => {
        return "100px";
      },
    },
    containerHeight: {
      type: String,
      default: () => {
        return "50vh";
      },
    },
    longText: {
      type: Object,
      default: () => {
        return {
          A: A,
          B: B,
        };
      },
    },
  },
  components: {
    "code-diff": CodeDiff,
    [AiyouSwitch.name]: AiyouSwitch,
  },
  data() {
    return {
      fotmat: false,
      context: 10000,
      diffStyle: "char",
      isShowNoChange: false,
      drawFileList: true,
      renderNothingWhenEmpty: false,
      hideEqual: false,
    };
  },
  computed: {
    outputFormat() {
      return this.fotmat ? "line-by-line" : "side-by-side";
    },
  },
  watch: {
    hideEqual() {
      if (this.hideEqual) {
        this.context = 0;
      } else {
        this.context = 10000;
      }
    },
  },
  mounted() {
    this.initMiniMap();
  },
  created() {},
  methods: {
    handleHideRow(val) {
      console.log("val", val);
      this.hideEqual = val;

      console.time("handleHideRow() {reInitMiniMap");
      this.reInitMiniMap();
      console.timeEnd("handleHideRow() {reInitMiniMap");
    },
    handleChangeDiffStyle() {
      this.diffStyle = this.diffStyle === "char" ? "word" : "char";
      this.reInitMiniMap();
    },

    initMiniMap() {
      pageMap(document.querySelector("#map"), {
        viewport: document.querySelector("#code-diff"),
        styles: {
          "td.d2h-change.d2h-del": "rgba(255, 0, 0, 0.4)",
          "td.d2h-change.d2h-del del": "rgba(255, 0, 0, 1)",
          "td.d2h-change.d2h-ins": "rgba(0,255,0, 0.4)",
          "td.d2h-change.d2h-ins ins": "rgba(0,255,0, 1)",
        },
        back: "rgba(0,0,0,0.02)",
        view: "rgba(0,0,0,0.05)",
        drag: "rgba(0,0,0,0.10)",
        interval: null,
      });
    },

    reInitMiniMap(val) {
      if ([true, false].includes(val)) {
        this.fotmat = val;
      }

      setTimeout(() => {
        const map = document.querySelector("#map");
        const parent = map.parentElement;
        const cloneMap = map.cloneNode(true);
        cloneMap.style = "";
        map.remove();
        const fisrtNode = parent.children[0];
        parent.insertBefore(cloneMap, fisrtNode);
        this.initMiniMap();
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-diff {
  #map {
    top: 0;
    right: 0;
    width: 50px;
    // width: 160px;
    margin-right: 10px;
    z-index: 100;
  }

  #box-container {
    display: flex;
    // height: 55vh;
  }

  #code-diff {
    flex: auto;
    // height: 55vh;
    overflow-y: auto;
  }

  .box-wrapper {
    display: flex;
    flex-direction: row;

    .box {
      flex: 1;

      label {
        font-weight: 700;
      }
    }
  }

  /*设置按钮样式*/
  .button {
    width: 100px;
    height: 29px;
    line-height: 29px;
    text-align: center; /*内容居中*/
    cursor: pointer; /*设置光标样式*/
    outline: none; /*消除outline*/
    color: #fff;
    border: none; /*消除border*/
  }

  /*涟漪特效*/
  .ripple {
    position: relative; /*设置为相对定位*/
    background-color: #59c85d;

    border-radius: 7px;
    overflow: hidden; /*让:after超出按钮边框部分隐藏*/
    text-decoration: none;
  }

  .ripple:after {
    content: "";
    background: #90ee90;
    display: block; /*设置为块级元素，以可以设置尺寸*/
    position: absolute; /*相对按钮绝对定位*/
    left: 0; /*如果是right为0，则靠右边出现涟漪*/
    top: 0;
    padding-top: 100%;
    padding-right: 100%;
    opacity: 0; /*默认状态下隐藏*/
    transition: all 0.8s;
  }

  .ripple:active:after {
    padding-right: 0; /*padding-right为0，使:after宽度为0*/
    opacity: 1; /*点击时出现*/
    transition: 0s; /*点击时瞬间出现*/
  }
  /*点击时，:after瞬间出现，但是尺寸为0。
  点击完，在0.8s内，:after宽度增加，但是透明度逐渐为0。
  用此方法，实现涟漪效果。
*/

  padding: 10px;
  // height: 70vh;
  // overflow-y: auto;
  overflow: hidden;

  ::v-deep .d2h-file-list-title,
  ::v-deep .d2h-info {
    display: none;
  }
}
</style>
