const vnsComponent = {
  name: 'vue-number-scroll',
  props: {
    speed: {
      type: Number,
      required: false,
      default: 50
    },
    times: {
      type: Number,
      required: false,
      default: 10
    },
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: false,
      default: 0
    },
    format: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      showNumber: 0
    }
  },
  render(h) { return h('span', this.format? this.format(this.showNumber): this.showNumber) },
  // template: '<span><template v-if="format">{{ format(showNumber) }}</template><template v-else>{{ showNumber }}</template></span>',
  created() {
    this.showNumber = this.start
  },
  mounted() {
    this.JNumberScroll({
      speed: this.speed, // 变换速度
      times: this.times, // 变换次数
      start: this.start, // 起始数量
      end: this.end // 到达数量
    })
  },
  watch: {
    end(newValue, oldValue) {
      this.JNumberScroll({
        speed: this.speed, // 变换速度
        times: this.times, // 变换次数
        start: oldValue, // 起始数量
        end: newValue // 到达数量
      })
    }
  },
  methods: {
    JNumberScroll(params) {

      // 分割后要遍历显示的数组
      let splitArr = [];

      // end 和 start之间的间隔
      let gap = Math.abs(params.end - params.start)
      // 判断是增加还是减少
      let add = params.end - params.start > 0

      // 叠加数
      let splitNum = gap / params.times;
      // end字符串，用于判断变化过程是否显示小数
      let endStr = String(params.end);

      // end是否为浮点数，用途就是展示效果是否显示小数
      let isFloat = endStr.indexOf('.') !== -1;

      // 整数叠加数小于1的可能，间隔最小就为1，次数也为end-start的绝对值
      !isFloat && (splitNum < 1) && (splitNum = 1) && (params.times = gap)

      for (let i = 0; i < params.times; i++) {
        let tempNum = add ? (params.start + splitNum * i) : (params.start - splitNum * i)

        // 小数的位数
        let decimalNum = 0;
        // 如果是浮点数，就获取小数的位数
        isFloat && (decimalNum = endStr.length - endStr.indexOf('.') - 1)

        // 最后是否保留小数位
        splitArr.push(isFloat ? (parseInt(tempNum * 10 ** decimalNum) / (10 ** decimalNum)) : parseInt(tempNum))
      }
      // 如果增加，并且数组最后一位比end小，则push最后一位；如果减少，并且数组最后一位比end大，则push最后一位
      ((add && (splitArr[splitArr.length - 1] < params.end)) || (!add && (splitArr[splitArr.length - 1] > params.end))) && splitArr.push(params.end);
      
      let _index = 0;

      let _this = this;
      // 定时显示
      let intervalId = setInterval(function () {

        if (_index < splitArr.length)
          _this.showNumber = (splitArr[_index++])
        else {
          clearInterval(intervalId)
        }
      }, params.speed)
    }
  }
}

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("vns", vnsComponent);
}

export default vnsComponent;