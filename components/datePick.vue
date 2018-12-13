<template>
    <view>
			<view class="uni-title">
				{{year}}-{{month}}-{{day}} 至 {{year2}}-{{month2}}-{{day2}}
			</view>
      <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
          <picker-view-column>
              <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
          </picker-view-column>
      </picker-view>
    </view>
</template>

<script>
    export default {
        data () {
            const date = new Date()
            const years = []
            const years2 = []
            const year = date.getFullYear()
            const year2 = year
            const months = []
            const months2 = []
            const month = date.getMonth() + 1
            const month2 = month
            const days = []
            const days2 = []
            const day = date.getDate()
            const day2 = day

            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
                years2.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i)
                months2.push(i)
            }

            for (let i = 1; i <= 31; i++) {
                days.push(i)
                days2.push(i)
            }
            return {
                title: 'picker-view',
                years,
                years2,
                year,
                year2,
                months,
                months2,
                month,
                month2,
                days,
                days2,
                day,
                day2,
                value: [9999, month - 1, day - 1,9999, month2 - 1, day2 - 1],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
                visible: true,
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
            }
        },
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
                console.log(val);
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
            }
        }
    }
</script>

<style>
	
    picker-view {
        width: 100%;
        height: 600upx;
        margin-top:20upx;
    }

    .item {
        line-height: 100upx;
        text-align: center;
    }
</style>
