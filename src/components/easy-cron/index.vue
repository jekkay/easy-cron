<template>
  <Card class="easy-cron">
    <div class="content">
      <div class="left">
        <Tabs size="small" v-model="curtab">
          <TabPane label="秒" name="second"><second-ui v-model="second" :disabled="disabled"></second-ui></TabPane>
          <TabPane label="分" name="minute"><minute-ui v-model="minute" :disabled="disabled"></minute-ui></TabPane>
          <TabPane label="时" name="hour"><hour-ui v-model="hour" :disabled="disabled"></hour-ui></TabPane>
          <TabPane label="日" name="day"><day-ui v-model="day" :week="week" :disabled="disabled"></day-ui></TabPane>
          <TabPane label="月" name="month"><month-ui v-model="month" :disabled="disabled"></month-ui></TabPane>
          <TabPane label="周" name="week"><week-ui v-model="week" :day="day" :disabled="disabled"></week-ui></TabPane>
          <TabPane label="年" name="year"><year-ui v-model="year" :disabled="disabled"></year-ui></TabPane>
        </Tabs>
      </div>
      <div class="right">
        <div class="field-list"><Table stripe :columns="columns" :data="tableData"
          :show-header="false" size="small"></Table></div>
        <div class="exe-pre">
          <div class="exe-pre-panel">
            <label class="p-left">执行时间</label>
            <DatePicker type="datetime" v-model="startTime" class="p-right" @on-change="calTriggerList"
              placeholder="选择执行开始时间"></DatePicker>
          </div>
          <div class="exe-pre-panel">
            <Tooltip content="执行预览解析不含年参数" class="p-left">
              <label>执行预览</label>
            </Tooltip>
            <Input type="textarea" :value="preTimeList" class="p-right" :rows="4" readonly />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import SecondUi from './tabs/second'
import MinuteUi from './tabs/minute'
import HourUi from './tabs/hour'
import DayUi from './tabs/day'
import WeekUi from './tabs/week'
import MonthUi from './tabs/month'
import YearUi from './tabs/year'
import CronParser from 'cron-parser'
import dateFormat from './format-date'

export default {
  name: 'easy-cron',
  model: {
    prop: 'cronValue',
    event: 'change'
  },
  props: {
    cronValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    exeStartTime: {
      type: [Number, String, Object],
      default: 0
    }
  },
  data () {
    return {
      curtab: '',
      second: '*',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      week: '?',
      year: '*',
      startTime: new Date(),
      preTimeList: '执行预览，会忽略年份参数',
      columns: [{ title: ' ', width: '80', key: 'name' }, { title: ' ', key: 'value' }]
    }
  },
  computed: {
    tableData () {
      return [
        { name: '秒', value: this.second },
        { name: '分', value: this.minute },
        { name: '时', value: this.hour },
        { name: '日', value: this.day },
        { name: '月', value: this.month },
        { name: '周', value: this.week },
        { name: '年', value: this.year },
        { name: '表达式', value: this.cronValue_c },
        { name: '表达式(不含年)', value: this.cronValue_c2 }
      ]
    },
    cronValue_c () {
      let result = []
      result.push(this.second ? this.second : '*')
      result.push(this.minute ? this.minute : '*')
      result.push(this.hour ? this.hour : '*')
      result.push(this.day ? this.day : '*')
      result.push(this.month ? this.month : '*')
      result.push(this.week ? this.week : '?')
      result.push(this.year ? this.year : '*')
      return result.join(' ')
    },
    cronValue_c2 () {
      return this.cronValue_c.split(' ').slice(0, 6).join(' ')
    }
  },
  watch: {
    cronValue (newVal, oldVal) {
      if (newVal === this.cronValue_c) {
        // console.info('same cron value: ' + newVal)
        return
      }
      this.formatValue()
    },
    cronValue_c (newVal, oldVal) {
      this.calTriggerList()
      this.$emit('change', newVal)
    },
    exeStartTime (newVal, oldVal) {
      this.calStartTime()
    }
  },
  methods: {
    formatValue () {
      // console.info(this.cronValue)
      if (!this.cronValue) return
      const values = this.cronValue.split(' ').filter(item => !!item)
      if (!values || values.length <= 0) return
      this.second = values[0]
      if (values.length > 1) this.minute = values[1]
      if (values.length > 2) this.hour = values[2]
      if (values.length > 3) this.day = values[3]
      if (values.length > 4) this.month = values[4]
      if (values.length > 5) this.week = values[5]
      if (values.length > 6) this.year = values[6]
    },
    calTriggerList () {
      // 去掉年份参数
      const e = this.cronValue_c2
      const format = 'yyyy-MM-dd hh:mm:ss'
      const options = {
        currentDate: dateFormat(this.startTime, format)
      }
      // console.info(options)
      const iter = CronParser.parseExpression(e, options)
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push(dateFormat(new Date(iter.next()), format))
      }
      this.preTimeList = result.length > 0 ? result.join('\n') : '无执行时间'
    },
    calStartTime () {
      if (!this.exeStartTime) {
        this.startTime = new Date()
        return
      }
      try {
        this.startTime = new Date(this.exeStartTime)
      } catch (e) {
        this.startTime = new Date()
      }
    }
  },
  components: {
    SecondUi,
    MinuteUi,
    HourUi,
    DayUi,
    WeekUi,
    MonthUi,
    YearUi
  },
  created () {
    this.formatValue()
    this.calStartTime()
  }
}
</script>

<style scoped>
.easy-cron {
  display: inline-block;
  border: 1px solid #2d8cf0;
}

.content {
  display: flex;
  flex-wrap: nowrap;
}

.left {
  flex-basis: 60%;
  width: 60%;
  border: 1px solid transparent;
  border-right-color: #2d8cf0;
}

.right {
  flex-basis: 40%;
  width: 40%;
  // border: 1px solid dimgray;
}

.ivu-table-small td {
  height: 30px !important;
}

.exe-pre {
  margin-top: 5px;
}

.exe-pre > div {
  margin-top: 5px;
}

.exe-pre-panel {
  display: flex;
  justify-content: flex-start;
}

.exe-pre-panel .p-left {
  flex-basis: 80px;
  flex-grow: 0;
}

.exe-pre-panel .p-right {
  flex-basis: 100px;
  flex-grow: 1;
}
</style>
