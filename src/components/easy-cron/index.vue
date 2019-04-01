<template>
  <div class="easy-cron">
    <div class="content">
      <div class="left">
        <Tabs size="small" v-model="curtab">
          <TabPane label="秒" name="second">
            <second></second>
          </TabPane>
          <TabPane label="分" name="minute">
            <minute></minute>
          </TabPane>
          <TabPane label="时" name="hour">
            <hour></hour>
          </TabPane>
          <TabPane label="日" name="day">
            <day></day>
          </TabPane>
          <TabPane label="月" name="month">
            <month></month>
          </TabPane>
          <TabPane label="周" name="week">
            <week></week>
          </TabPane>
          <TabPane label="年" name="year">
            <year></year>
          </TabPane>
        </Tabs>
      </div>
      <div class="right">
        right
        {{curtab}}
      </div>
    </div>
  </div>
</template>

<script>
import Second from './tabs/second'
import Minute from './tabs/minute'
import Hour from './tabs/hour'
import Day from './tabs/day'
import Week from './tabs/week'
import Month from './tabs/month'
import Year from './tabs/year'

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
      second: '',
      minute: '',
      hour: '',
      day: '',
      month: '',
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
    Second,
    Minute,
    Hour,
    Day,
    Week,
    Month,
    Year
  },
  created () {
  }
}
</script>

<style scoped>
.easy-cron {
  display: inline-block;
  border: 1px solid green;
}

.content {
  display: flex;
  flex-wrap: nowrap;
}

.left {
  flex-basis: 60%;
}

.right {
  flex-basis: 40%;
}
</style>
