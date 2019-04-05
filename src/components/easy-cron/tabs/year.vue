<template>
  <div class="config-list">
    <RadioGroup v-model="type">
    <div class="item">
      <Radio label="TYPE_EVERY" class="choice" :disabled="disabled">每年</Radio>
    </div>
    <div class="item">
      <Radio label="TYPE_RANGE" class="choice" :disabled="disabled">区间</Radio>
       从<InputNumber :disabled="type!=TYPE_RANGE || disabled" :min="0" :precision="0"
        class="w60" v-model="valueRange.start" />年
       至<InputNumber :disabled="type!=TYPE_RANGE || disabled" :min="1" :precision="0"
        class="w60" v-model="valueRange.end" />年
    </div>
    <div class="item">
      <Radio label="TYPE_LOOP" class="choice" :disabled="disabled">循环</Radio>
      从<InputNumber :disabled="type!=TYPE_LOOP || disabled" :min="0" :precision="0"
       class="w60" v-model="valueLoop.start" />年开始，间隔
      <InputNumber :disabled="type!=TYPE_LOOP || disabled" :min="1" :precision="0"
       class="w60" v-model="valueLoop.interval" />年
    </div>
    </RadioGroup>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'year',
  mixins: [mixin],
  data () {
    return {}
  },
  watch: {
    value_c (newVal, oldVal) {
      // console.info('change:' + newVal)
      this.$emit('change', newVal)
    }
  },
  created () {
    const nowYear = (new Date()).getFullYear()
    this.DEFAULT_VALUE = '*'
    this.minValue = 0
    this.maxValue = 0
    this.valueRange.start = nowYear
    this.valueRange.end = nowYear + 100
    this.valueLoop.start = nowYear
    this.valueLoop.interval = 1
    // console.info('created')
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

.w60 {
  width: 60px;
}

.ivu-input-number {
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
