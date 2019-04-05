<template>
  <div class="config-list">
    <RadioGroup v-model="type">
    <div class="item">
      <Radio label="TYPE_NOT_SET" class="choice" :disabled="disableChoice">不设置</Radio>
      <span class="tip-info">日和周只能设置其中之一</span>
    </div>
    <div class="item">
      <Radio label="TYPE_RANGE" class="choice" :disabled="disableChoice">区间</Radio>
       从<Select v-model="valueRange.start"  class="w80" :disabled="type!=TYPE_RANGE || disableChoice">
        <Option v-for="(v, k) of WEEK_MAP" :value="v" :key="`week-pre-Lf13-${v}`">{{ k }}</Option>
      </Select>
       至<Select v-model="valueRange.end"  class="w80" :disabled="type!=TYPE_RANGE || disableChoice">
        <Option v-for="(v, k) of WEEK_MAP" :value="v" :key="`week-next-1fas-${v}`">{{ k }}</Option>
      </Select>
    </div>
    <div class="item">
      <Radio label="TYPE_LOOP" class="choice" :disabled="disableChoice">循环</Radio>
      从<Select v-model="valueLoop.start"  class="w80" :disabled="type!=TYPE_LOOP || disableChoice">
        <Option v-for="(v, k) of WEEK_MAP" :value="v" :key="`week-pre-Lf13-${v}`">{{ k }}</Option>
      </Select>开始，间隔
      <InputNumber :disabled="type!=TYPE_LOOP || disableChoice" :max="maxValue" :min="minValue" :precision="0"
       class="w60" v-model="valueLoop.interval" /> 天
    </div>
    <div class="item">
      <Radio  label="TYPE_SPECIFY" class="choice" :disabled="disableChoice">指定</Radio>
      <div class="list">
        <CheckboxGroup v-model="valueList">
          <Checkbox class="list-check-item" v-for="(v, k) of WEEK_MAP"
            :label="v" :key="`key-01jfs-${v}`" :disabled="type!=TYPE_SPECIFY || disableChoice"><span>{{k}}</span></Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    </RadioGroup>
  </div>
</template>

<script>
import mixin from './mixin'
import { WEEK_MAP_EN, replaceWeekName } from './const.js'

const WEEK_MAP = {
  '周日': 0,
  '周一': 1,
  '周二': 2,
  '周三': 3,
  '周四': 4,
  '周五': 5,
  '周六': 6
}

export default {
  name: 'week',
  mixins: [mixin],
  props: {
    day: {
      type: String,
      default: '*'
    }
  },
  data () {
    return {
      WEEK_MAP,
      WEEK_MAP_EN
    }
  },
  computed: {
    disableChoice () {
      return (this.day && this.day !== '?') || this.disabled
    }
  },
  watch: {
    value_c (newVal, oldVal) {
      // 如果设置日，那么星期就直接不设置
      this.updateValue()
    },
    day (newVal) {
      // console.info('new day: ' + newVal)
      this.updateValue()
    }
  },
  methods: {
    updateValue () {
      this.$emit('change', this.disableChoice ? '?' : this.value_c)
    },
    preProcessProp (c) {
      return replaceWeekName(c)
    }
  },
  created () {
    this.DEFAULT_VALUE = '*'
    // 0,7表示周日 1表示周一
    this.minValue = 0
    this.maxValue = 6
    this.valueRange.start = 0
    this.valueRange.end = 6
    this.valueLoop.start = 2
    this.valueLoop.interval = 1
    this.parseProp(this.prop)
  }
}
</script>

<style scoped>

.config-list {
  text-align: left;
  margin: 0 10px 10px 10px;
}

.item {
  margin-top: 5px;
}

.tip-info {
  color: #999
}

.choice {
  border: 1px solid transparent;
  padding: 5px 8px;
}

.choice:hover {
  border: 1px solid #2d8cf0;
}

.w80 {
  width: 80px;
}

.ivu-input-number, .ivu-select {
  margin-left: 5px;
  margin-right: 5px;
}

.list {
  margin: 0 20px;
}

.list-check-item {
  padding: 1px 3px;
  width: 4em;
}
</style>
