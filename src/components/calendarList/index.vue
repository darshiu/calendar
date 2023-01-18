<template>
  <div id="calenderBox" ref="calendar">
    <div v-loading="calendarLoading" class="calenderContent" element-laoding-spinner="el-icon-loading" element-loading-text="loading">
      <calendar-list-page v-if="showCalendar" ref="calendar-list" :options="calendarOption"></calendar-list-page>
    </div>
    <!-- <createForm ref="create_page" @getHoliday="getHoliday"></createForm> -->
  </div>
</template>
<script>
import dayjs from 'dayjs'
// import createForm from '../../create'
import calendarListPage from './calendar.vue'
export default {
  components: {
    // createForm,
    calendarListPage
  },
  props: {
    options: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      calendarOption: {
        year: '',
        holidays: {}
      },
      calendarLoading: false,
      showCalendar: false
    }
  },
  watch: {
    'options'(newD, oldD) {
      this.getHoliday()
    }
  },
  created() {
    this.getHoliday()
    console.log('lkl')
  },
  methods: {
    async getHoliday() {
      this.calendarLoading = true
      this.calendarOption.year = this.options
      this.calendarOption.holidays = []
      const datas = {
        year: this.calendarOption.year
      }
      const holidays = {}
      const res = {
        content: [
          {
            id: '1234',
            type: '1',
            startTime: '2022-01-01 00:00:00',
            endTime: '2022-01-01 23:59:59',
            description: '',
            scheName: '白班, 晚班',
            schedulingtyeId: '12,23'
          }, {
            id: '1235',
            type: '1',
            startTime: '2022-01-02 00:00:00',
            endTime: '2022-01-03 23:59:59',
            description: '',
            scheName: '白班, 晚班',
            schedulingtyeId: '12,23'
          },  {
            id: '1236',
            type: '1',
            startTime: '2022-03-02 00:00:00',
            endTime: '2022-03-03 23:59:59',
            description: '',
            scheName: '白班, 晚班',
            schedulingtyeId: '12,23'
          }, {
            id: '1237',
            type: '2',
            startTime: '2022-01-25 00:00:00',
            endTime: '2022-01-29 23:59:59',
            description: '',
            scheName: '白班, 晚班',
            schedulingtyeId: '12,23'
          },
        ]
      }
      res.content.map(val => {
        val.startTimeCn = dayjs(val.startTime).valueOf()
        console.log(val.startTimeCn)
        val.endTimeCn = dayjs(val.endTime).valueOf()

        for (let i = val.startTimeCn; i <= val.endTimeCn; i += 86400000) {
          const db = new Date(i)

          const dateValue = {
            mon: db.getMonth() + 1,
            day: db.getDate()
          }
          if (holidays[dateValue.mon] === undefined) {
            holidays[dateValue.mon] = {}
            holidays[dateValue.mon][dateValue.day] = { id: val.id, description: val.description, dateRange: [val.startTime, val.endTime], schedulingtyeId: val.schedulingtyeId ? val.schedulingtyeId.split(',') : [], type: parseInt(val.type), date: dateValue.mon + '.'+ dateValue.day }
          } else {
            holidays[dateValue.mon][dateValue.day] = { id: val.id, description: val.description, dateRange: [val.startTime, val.endTime], schedulingtyeId: val.schedulingtyeId ? val.schedulingtyeId.split(',') : [], type: parseInt(val.type), date: dateValue.mon + '.'+ dateValue.day }
          }
        }
      })
      this.showCalendar = true
      this.calendarOption.holidays = holidays
      this.calendarLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
#calenderBox {
  width: 100%;
  height: 100%;
  text-align: center;
  .calenderContent {
    height: calc(100% - 25px);
    max-height: calc(100% - 25px);
    width: 100%;
    padding: 0 20px;
    overflow-y: auto;

    /deep/ .calendar_list {
      margin: auto;
    }
  }
}
@media screen and (max-width: 1440px) {
  #calenderBox .calenderContent {
    padding: 15px 40px;
  }
  #calenderBox .calenderContent /deep/ #calendar_list {
    zoom: 0.74;
  }
}
@media screen and (max-width: 1366px) {
  #calenderBox .calenderContent {
    padding: 15px;
  }
  #calenderBox .calenderContent /deep/ #calendar_list {
    zoom: 0.72;
  }
}
@media screen and (max-width: 1280px) {
  #calenderBox .calenderContent {
    padding: 15px;
  }
  #calenderBox .calenderContent /deep/ #calendar_list {
    zoom: 0.675;
  }
}
</style>