<template>
  <Card class="easy-cron">
    <div class="content">
      <div class="left">
        <Tabs size="small" v-model="curtab">
          <TabPane label="秒" name="second">
            <second-ui v-model="second"></second-ui>
          </TabPane>
          <TabPane label="分" name="minute">
            <minute-ui v-model="minute"></minute-ui>
          </TabPane>
          <TabPane label="时" name="hour">
            <hour-ui v-model="hour"></hour-ui>
          </TabPane>
          <TabPane label="日" name="day">
            <day-ui v-model="day"></day-ui>
          </TabPane>
          <TabPane label="月" name="month">
            <month-ui v-model="month"></month-ui>
          </TabPane>
          <TabPane label="周" name="week">
            <week-ui v-model="week" :day="day"></week-ui>
          </TabPane>
          <TabPane label="年" name="year">
            <year-ui v-model="year"></year-ui>
          </TabPane>
        </Tabs>
      </div>
      <div class="right">
        {{curtab}}
        <div style="color: red"> 秒:{{second}} </div>
        <div style="color: red"> 分:{{minute}} </div>
        <div style="color: red"> 时:{{hour}} </div>
        <div style="color: red"> 日:{{day}} </div>
        <div style="color: red"> 月:{{month}} </div>
        <div style="color: red"> 周:{{week}} </div>
        <div style="color: red"> 年:{{year}} </div>
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

export default {
  name: 'easy-cron',
  props: {
    cronValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curtab: '',
      second: '1',
      minute: '2-4',
      hour: '3/5',
      day: '3/12',
      month: '4,5,8',
      week: '',
      year: ''
    }
  },
  watch: {
    cronValue (newValue, oldValue) {
      console.info(newValue)
    }
  },
  methods: {
    formatValue () {
      console.info(this.cronValue)
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
  // border: 1px solid dimgray;
}
</style>
