<template>
  <div class="config-list">
    <RadioGroup v-model="type">
    <div class="item">
      <Radio label="TYPE_NOT_SET" class="choice" :disabled="disableChoice">不设置</Radio>
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

const WEEK_MAP = {
  '周日': 1,
  '周一': 2,
  '周二': 3,
  '周三': 4,
  '周四': 5,
  '周五': 6,
  '周六': 7
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
      WEEK_MAP
    }
  },
  computed: {
    disableChoice () {
      console.info(this.day)
      if (!this.day) return false
      return this.day !== '*' && this.day !== '?'
    }
  },
  watch: {
    value_c (newVal, oldVal) {
      // 如果设置日，那么星期就直接不设置
      this.updateValue()
    },
    day (newVal) {
      console.info('new day: ' + newVal)
      this.updateValue()
    }
  },
  methods: {
    updateValue () {
      this.$emit('change', this.disableChoice ? '?' : this.value_c)
    }
  },
  created () {
    this.DEFAULT_VALUE = '*'
    // 1表示周日 2表示周一
    this.minValue = 1
    this.maxValue = 7
    this.valueRange.start = 1
    this.valueRange.end = 7
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
