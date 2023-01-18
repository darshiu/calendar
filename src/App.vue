<template>
  <div id="app">
    <div id="productCalendar">
      <div class="container">
        <div class="header">
          <div class="titleInfo">
            <span>Calendar</span>
            <template v-for="(item, ind) in typeOption">
              <div :key="ind" class="graph"  v-if="tabPosition === 'calenderYear'">
                <div :style="`background: ${item.color}`" style="width: 20px; height: 20px;"></div>
                <div style="margin: 5px;">{{ item.value }}</div>
              </div>
            </template>
          </div>
          <div class="btns">
            <el-radio-group v-model="tabPosition" style="">
              <el-radio-button label="calenderYear">Year</el-radio-button>
              <el-radio-button label="calenderMonth">Month</el-radio-button>
            </el-radio-group>
          </div>
          <div class="optsBox">
            <el-date-picker
              v-if="tabPosition === 'calenderMonth'"
              v-model="month"
              type="month"
              value-format="yyyy-M"
              placeholder=""
            ></el-date-picker>
            <el-date-picker
              v-if="tabPosition === 'calenderYear'"
              v-model="year"
              type="year"
              value-format="yyyy"
              placeholder=""
            ></el-date-picker>
          </div>
        </div>
        <div class="main">
          <calendarListPage v-if="tabPosition === 'calenderYear'" ref="calender" :options="year"></calendarListPage>
          <calendarMonthPage v-if="tabPosition === 'calenderMonth'" ref="tablePage" :options="month"></calendarMonthPage>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import calendarListPage from "./components/calendarList/index.vue";
import calendarMonthPage from "./components/calendarMonth/index.vue";
export default {
  components: {
    calendarListPage,
    calendarMonthPage,
  },
  data() {
    return {
      tabPosition: "calenderYear",
      typeOption: [
        { value: "Work", color: "#3A84FF" },
        { value: "Rest", color: "#B7C7E0" },
      ],
      month: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      year: new Date().getFullYear() + '',
    };
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  padding: 10px;
  // overflow: hidden;
}

#productCalendar {
  width: 100%;
  height: 100%;
  background: #F8F9FB;
  .container {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #DCDEE3;
      background: #fff;
      border: 1px solid #DCDEE3;
      margin-bottom: 10px;
      padding: 0 5px;
      position: relative;
      display: flex;
      .titleInfo {
        display: flex;
        font-size: 0;
        padding: 13px 0;
        >span {
          display: inline-block;
          font-size: 14px;
          font-weight: 900;
          vertical-align: top;
          padding-right: 15px;
          border-right: 1px solid #DCDEE3;
        }
        .graph {
          display: flex;
          vertical-align: top;
          font-size: 12px;
          margin-left: 20px;
        }

        .graph >span {
          display: inline-block;
          position: relative;
          top: 0;
          left: 0;
          height: 10px;
          width: 1px;
          margin-right: 15px;
        }
      }
      .btns {
        position: absolute;
        right: 5px;
        width: auto;
        height: 100%;
        padding-top: 7px;
      }
      .optsBox {
        position: absolute;
        right: 145px;
        width: auto;
        height: 100%;
        padding-top: 7px;
      }
    }
    .main {
      width: 100%;
      height: calc(100% - 52px);
    }
  }
}
</style>