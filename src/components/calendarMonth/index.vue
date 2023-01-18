<template>
  <div id="calendar_list" ref="calendar">
    <div class="calendar_mon">
      <div class="monContent">
        <template v-for="weekItem in weekList">
          <div :key="weekItem.en" class="cItem weeks">{{ weekItem.enShort }}</div>
        </template>
        <template v-for="(preItem, pInd) in data[monItem.en].pre">
          <div :key="'pre'+ pInd" class="cItem day" style="background: #fff;">
            <span class="cell">{{ preItem }}</span>
          </div>
        </template>
        <template v-for="(mainItem, mInd) in data[monItem.en].main">
          <div :key="'main'+ mInd" class="cItem day main">
            <Cell :config="[monItem.num, mainItem, fakeData]"></Cell>
          </div>
        </template>
        <template v-for="(nextItem, nInd) in data[monItem.en].next">
          <div :key="'next'+ nInd" class="cItem day" style="background: #fff;">
            <span class="cell">{{ nextItem }}</span>
          </div>
        </template>
      </div>
    </div>
    <!-- <createForm ref="edit_page"></createForm> -->
  </div>
</template>
<script>
import getWeeks from './getData.js'
import { dateMaps } from './dateMap.js'
import Cell from './cell.js'
// import createForm from '../../create'

export default {
  components: {
    // createForm,
    Cell
  },
  props: {
    options: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      monthList: dateMaps.monthList,
      weekList: dateMaps.weekList,
      monItem: {},
      weekendNum: [6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41, 42],
      data: [],
      fakeData: {},
      month: '',
      selectData: []
    }
  },
  watch: {
    'options'(newD, oldD) {
      this.init()
    }
  },
  created() {
    this.init()
    
  },
  methods: {
    init() {
      this.selectData = this.options.split('-')
      let monEn = ''
      console.log(this.selectData)
      this.monthList.map(val => {
        if (val.num === this.selectData[1]) {
          monEn = val.en
        }
      })
      
      this.monItem = { en: monEn, num: this.selectData[1] }
      this.queryCalendarData()
    },
    async queryCalendarData() {
      console.log(this.monItem)
      this.data = getWeeks.run(this.selectData[0])
      const opt = this.selectData[0] + '-' + this.addZero(this.selectData[1])
      const res = {
        content: {
          1: {
            1: [
              {
                id: '12',
                beginTime: '2023-01-01 23:30:00',
                beginTimeDate: '2023-01-01',
                calendarId: '3434',
                endTime: '2023-01-01 23:45:00',
                shiftName: 'night',
              }
            ]
          }
        }
      }
      this.fakeData = res.content
      
    },
    addZero(s) {
      return s < 10 ? '0' + s : s
    }
  }
}
</script>
<style lang="less" scoped>
#calendar_list {
  min-height: 100%;
  width: 100%;
  height: 100%;
  font-size: 0;
  margin-top: 10px;
  background: #f8f9fb;
  padding-bottom: 8px;
  .optsBox {
    height: 55px;
    width: 100%;
    padding: 10px 25px;
    .optsBox_date {
      float: left;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .calendar_mon {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: #fff;
    .monContent {
      // display: flex;
      flex-wrap: wrap;
      height: 100%;
      width: 100%;
      .cItem {
        display: inline-block;
        width: 53px;
        height: 30px;
        flex: 1 0 auto;
        font-size: 16px;
        border: 1px solid #DCDEE3;
        border-top: none;
        border-right: none;
      }
      .cItem + .cItem {

      }
      .cItem:nth-child(7n) {
        border-right: 1px solid #DCDEE3;
      }
      .cItem .cell {
        display: inline-block;
        height: 100%;
        width: 100%;
        line-height: 24px;
        border-radius: 30px;
        .cellContent {
          position: relative;
          width: 100%;
          border: 1px solid #DCDEE3;
          border-radius: 2px;
          font-size: 12px;
          > span {
            position: absolute;
            font-size: 12px;
            top: calc(50% - 12px);
            left: 10px;
          }
        }
        .date {
          width: 100%;
          padding-left: 25px;
          text-align: left;
        }
      }
      .cItem.weeks {
        height: 60px;
        width: calc(100% / 7);
        line-height: 58px;
        font-weight: bold;
        text-align: center;
        border-top: 1px solid #DCDEE3;
      }
      .cItem.day {
        height: calc((100% - 60px) / 6);
        width: calc(100% / 7);
        line-height: 20px;
        padding: 1px;
        position: relative;
        color: #DCDEE3;
        .dayStatus {
          position: absolute;
          top: -6px;
          right: 6px;
          transform: scale(0.7);
        }
        .cell {
          padding-left: 25px;
        }
      }
      .cItem.day.main {
        color: #333333;
        .cell {
          padding-left: 0px;
        }
      }
      .cItem.day.today {
        .cell {
          color: #fff;
          background: #4386ff !important;
        }
      }      
    }
  }
}
.detailCard {
  ul {
    li {
      span:nth-child(1) {
        font-weight: 600;
      }
      span:nth-child(2) {
        color: #3a84ff;
      }
    }
  }
}
</style>