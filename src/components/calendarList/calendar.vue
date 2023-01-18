<template>
  <div id="calendar_list" ref="calendar">
    <template></template>
    <template v-for="monItem in monthList">
      <div :key="monItem.en" class="calendar_mon">
        <div class="monTitle">{{ monItem.en }}</div>
        <div class="monContent">
          <template v-for="weekItem in weekList">
            <div :key="weekItem.en" class="cItem weeks">{{ weekItem.enShort }}</div>
          </template>
          <template v-for="(preItem, pInd) in data[monItem.en].pre">
            <div :key="'pre'+pInd" class="cItem day">
              <span class="cell">{{ preItem }}</span>
            </div>
          </template>
          <template v-for="(mainItem, mInd) in data[monItem.en].main">
            <el-popover 
              v-if="options.holidays[monItem.num] && options.holidays[monItem.num][mainItem]" 
              ref="popover"
              :key="mInd"
              placement="bottom"
              width="400"
              trigger="click"
            >
              <div v-if="options.holidays[monItem.num] && options.holidays[monItem.num][mainItem]" class="detailCard">
                <el-form ref="form">
                  <el-form-item label="Date" prop="date">
                    <el-date-picker v-model="formData.dateRange" type="daterange" range-separator="-" disabled></el-date-picker>
                  </el-form-item>
                  <el-form-item label="Type" prop="type" :rules="[{ required: true, message: 'please select', trigger: 'blur' }]">
                    <el-radio-group v-model="formData.type">
                      <el-radio :label="2">rest</el-radio>
                      <el-radio :label="1">work</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="Description" prop="description">
                    <el-input v-model="formData.description" placeholder="Description" maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="editSubmit(formData)">Submit</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="reference" :key="'main'+mInd" class="cItem day main"
                :class="{
                  workTime: options.holidays[monItem.num] && options.holidays[monItem.num][mainItem] && options.holidays[monItem.num][mainItem].type == '1',
                  holiday: options.holidays[monItem.num] && options.holidays[monItem.num][mainItem] && options.holidays[monItem.num][mainItem].type == '2',
                  today: todayDate.year === options.year && todayDate.mon == monItem.num && todayDate.day == mainItem
                }"
                @click="changeValue(options.holidays[monItem.num][mainItem])"
              >
                <span class="cell">{{ mainItem }}</span>
              </div>
            </el-popover>
            <div
              v-else
              :key="'main' + mInd"
              class="cItem day main"
              :class="{
                workTime: options.holidays[monItem.num] && options.holidays[monItem.num][mainItem] && options.holidays[monItem.num][mainItem].type == '1',
                holiday: options.holidays[monItem.num] && options.holidays[monItem.num][mainItem] && options.holidays[monItem.num][mainItem].type == '2',
                today: todayDate.year === options.year && todayDate.mon == monItem.num && todayDate.day == mainItem
              }"
            >
              <span class="cell">{{ mainItem }}</span>
            </div>
          </template>
          <template v-for="(nextItem, nInd) in data[monItem.en].next">
            <div :key="'next'+ nInd" class="cItem day">
              <span class="cell">{{ nextItem }}</span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import getWeeks from "./getData.js"
import { dateMaps } from "./dateMap.js"
export default {
  components: {

  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          year: '',
          holidays: {}
        }
      }
    }
  },
  data() {
    return {
      monthList: dateMaps.monthList,
      weekList: dateMaps.weekList,
      checkValue: [],
      weekendNum: [6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41, 42],
      todayDate: {
        year: '',
        mon: '',
        day: '',
      },
      data: [],
      formData: {
        schedulingtypeId: [],
        type: 1,
        dateRange: [],
        description: '',
        id: '',
        startTime: '',
        endTime: ''
      },
      classList: []
    }

  },
  watch: {
    'options.year'(newD, oldD) {
      this.queryCalendarData()
    }
  },
  created() {
    this.options.year = new Date().getFullYear() + ''
    this.init()
  },
  methods: {
    init() {
      this.queryCalendarData()
      this.getToday()
    },
    queryCalendarData() {
      this.data = getWeeks.run(this.options.year)
    },
    getToday() {
      const today = new Date()
      this.todayDate.year = today.getFullYear()
      this.todayDate.mon = today.getMonth() + 1
      this.todayDate.day = today.getDate()
    },
    changeValue(data) {
      console.log(data)
    }
  }
  
}
</script>
<style lang="less" scoped>
#calendar_list {
  min-height: 100%;
  width: auto;
  font-size: 0;
  background: #F8F9FB;
  padding-bottom: 8px;
  .calendar_mon {
    display: inline-block;
    width: 395px;
    height: 330px;
    padding: 10px;
    border-radius: 2px;
    background: #fff;
    border: 1px solid #C4C6CF;
    .monTitle {
      height: 35px;
      padding: 5px 10px;
      line-height: 19px;
      font-size: 14px;
      font-weight: bold;
      color: #398dee;
      text-align: right;
    }
    .monContent {
      display: flex;
      flex-wrap: wrap;
      height: calc(100% - 45px);
      width: 100%;
      .cItem {
        display: inline-block;
        width: 53px;
        height: 30px;
        flex: 1 0 auto;
        font-size: 12px;
        text-align: center;
      }
      .cItem .cell {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 24px;
        border-radius: 30px;
      }
      .cItem.weekend {
        color: rgb(250, 112, 112);
      }
      .cItem.weeks {
        height: 22px;
        line-height: 20px;
        font-weight: 600;
        color: #8D9299;
        margin-bottom: 5px;
      }
      .cItem.day {
        height: 34px;
        line-height: 22px;
        padding: 5px 15px;
        position: relative;
        margin-bottom: 10px;
        .dayStatus {
          position: absolute;
          top: -6px;
          right: 6px;
          transform: scale(0.7);
        }
      }
      .cItem.day.workTime {
        color: #fff;
        background: #3A84FF;
        cursor: pointer;
      }
      .cItem.day.holiday {
        color: #888888;
        background: #EEEEEE;
        cursor: pointer;
      }
      .cItem.day.today {
        .cell {
          color: #FFF;
          background: #6ca9f5;
        }       
      }
    }
  }
}
.detailCard {
  ::v-deep .el-form-item {
    .el-form-item__label {
      float: left;
      width: 90px;
      padding: 0 !important;
      padding-right: 10px !important;
      text-align: right;
    }
    .el-form-item__content {
      width: 75%;
      margin-left: 90px;
      .el-input {
        width: 100%;
      }
      .el-range-editor {
        width: 100%;
      }
    }
  }
  .el-button {
    float: right;
    color: #fff;
    background: #6ca6e6;
    border: 1px solid #6ca6e6;
  }
}
</style>