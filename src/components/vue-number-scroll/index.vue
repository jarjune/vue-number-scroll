<template>
  <span>
    <template v-if="format">
      {{ format(showNumber) }}
    </template>
    <template v-else>
      {{ showNumber }}
    </template>
  </span>
</template>

<script>

  export default {
    name: 'vue-number-scroll',
    props: [
      'speed',
      'times',
      'startNum',
      'endNum',
      'format'
    ],
    data() {
      return {
          showNumber: 0
      }
    },
    created() {
      this.showNumber = this.startNum || 0
    },
    mounted() {
      this.JNumberScroll({
        speed: Number(this.speed) || 50, // 变换速度
        times: Number(this.times) || 10, // 变换次数
        startNum: Number(this.startNum) || 0, // 起始数量
        endNum: Number(this.endNum) || 0 // 到达数量
      })
    },
    watch: {
      endNum(newValue, oldValue) {
        this.JNumberScroll({
          speed: Number(this.speed) || 50, // 变换速度
          times: Number(this.times) || 10, // 变换次数
          startNum: Number(oldValue) || 0, // 起始数量
          endNum: Number(newValue) || 0 // 到达数量
        })
      }
    },
    methods: {
      JNumberScroll(params) {
        var defaultParams = {
          speed: 50, // 变换速度(毫秒)
          times: 10, // 变换次数
          startNum: 0, // 开始数量
          endNum: 100 // 到达数量
        }

        for(var i in params) {
          defaultParams[i] = params[i]
        }

        // 分割后要遍历显示的数组
        var splitArr = [];

        // end 和 start之间的间隔
        var gap = Math.abs(defaultParams.endNum - defaultParams.startNum)
        // 判断是增加还是减少
        var add = defaultParams.endNum - defaultParams.startNum > 0

        // 叠加数
        var splitNum = gap / defaultParams.times;
        // end字符串，用于判断变化过程是否显示小数
        var endNumStr = String(defaultParams.endNum);

        // endNum是否为浮点数，用途就是展示效果是否显示小数
        var isFloat = endNumStr.indexOf('.') !== -1;

        // 整数叠加数小于1的可能，间隔最小就为1，次数也为end-start的绝对值
        !isFloat && (splitNum < 1) && (splitNum = 1) && (defaultParams.times = gap)

        for(var i = 0; i < defaultParams.times; i++) {
          var tempNum = add?(defaultParams.startNum + splitNum * i):(defaultParams.startNum - splitNum * i)

          // 小数的位数
          var decimalNum = 0;
          // 如果是浮点数，就获取小数的位数
          isFloat && (decimalNum = endNumStr.length - endNumStr.indexOf('.') - 1)

          // 最后是否保留小数位
          splitArr.push(isFloat?(parseInt(tempNum * 10 ** decimalNum) / (10 ** decimalNum)): parseInt(tempNum))
        }
        // 如果增加，并且数组最后一位比end小，则push最后一位；如果减少，并且数组最后一位比end大，则push最后一位
        ((add && (splitArr[splitArr.length-1] < defaultParams.endNum)) || (!add && (splitArr[splitArr.length-1] > defaultParams.endNum))) && splitArr.push(defaultParams.endNum);
        console.log(splitArr)
        var _index = 0;

        var _this = this;
        // 定时显示
        var intervalId = setInterval(function() {

          if(_index < splitArr.length)
            _this.showNumber = (splitArr[_index++])
          else {
            clearInterval(intervalId)
          }
        }, defaultParams.speed)
      }
    }
  }
</script>

<style>

</style>
