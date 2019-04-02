<template>
  <div class="config-list">
    <RadioGroup v-model="type">
    <div class="item">
      <Radio label="TYPE_EVERY" class="choice" :disabled="needDisabled">每日</Radio>
    </div>
    <div class="item">
      <Radio label="TYPE_RANGE" class="choice" :disabled="needDisabled">区间</Radio>
       从<InputNumber :disabled="type!=TYPE_RANGE || needDisabled" :max="maxValue" :min="minValue" :precision="0"
        class="w60" v-model="valueRange.start" />日
       至<InputNumber :disabled="type!=TYPE_RANGE || needDisabled" :max="maxValue" :min="minValue" :precision="0"
        class="w60" v-model="valueRange.end" />日
    </div>
    <div class="item">
      <Radio label="TYPE_LOOP" class="choice" :disabled="needDisabled">循环</Radio>
      从<InputNumber :disabled="type!=TYPE_LOOP || needDisabled" :max="maxValue" :min="minValue" :precision="0"
       class="w60" v-model="valueLoop.start" />日开始，间隔
      <InputNumber :disabled="type!=TYPE_LOOP || needDisabled" :max="maxValue" :min="minValue" :precision="0"
       class="w60" v-model="valueLoop.interval" />日
    </div>
    <div class="item">
      <Radio label="TYPE_WORK" class="choice" :disabled="needDisabled">工作日</Radio>
      本月<InputNumber :disabled="type!=TYPE_WORK || needDisabled" :max="maxValue" :min="minValue" :precision="0"
       class="w60" v-model="valueWork" />日，最近的工作日
    </div>
    <div class="item">
      <Radio label="TYPE_LAST" class="choice" :disabled="needDisabled">最后一日</Radio>
    </div>
    <div class="item">
      <Radio label="TYPE_SPECIFY" class="choice" :disabled="needDisabled">指定</Radio>
      <div class="list">
        <CheckboxGroup v-model="valueList">
          <Checkbox class="list-check-item" v-for="i in maxValue"
            :label="i" :key="`key-${i}`" :disabled="type!=TYPE_SPECIFY || needDisabled"></Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    </RadioGroup>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'day',
  mixins: [mixin],
  data () {
    return {}
  },
  computed: {
    needDisabled () {
      return false
    }
  },
  watch: {
    value_c (newVal, oldVal) {
      this.$emit('change', newVal)
    }
  },
  created () {
    this.DEFAULT_VALUE = '*'
    this.minValue = 1
    this.maxValue = 31
    this.valueRange.start = 1
    this.valueRange.end = 31
    this.valueLoop.start = 1
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
