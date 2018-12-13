<template>
	<view>
		<!-- button -->
		<view>
			<button type="default" :size="defaultSize" :loading="loading" :plain="plain" :disabled="disabled" @tap="defaultHandler"
			 hover-class="other-button-hover"> default </button>
			<button type="primary" :size="primarySize" :loading="loading" :plain="plain" :disabled="disabled" @tap="primaryHandler">
				primary </button>
			<button type="warn" :size="warnSize" :loading="loading" :plain="plain" :disabled="disabled" @tap="warnHandler"> warn
			</button>
			<button @tap="setDisabled">点击设置以上按钮disabled属性</button>
			<button @tap="setPlain">点击设置以上按钮plain属性</button>
			<button @tap="setLoading">点击设置以上按钮loading属性</button>
			
			<view class="section">
            <input placeholder="这是一个可以自动聚焦的input" focus/>
        </view>
        <view class="section">
            <input placeholder="这个只有在按钮点击的时候才聚焦" :focus="focus" />
            <view class="btn-area">
                <button @tap="buttonTap">使得输入框获取焦点</button>
            </view>
        </view>
        <view class="section">
            <input maxlength="10" placeholder="最大输入长度10" />
        </view>
        <view class="section">
            <view class="section__title">你输入的是：{{inputValue}}</view>
            <input @input="KeyInput" placeholder="输入同步到view中" />
        </view>
        <view class="section">
            <input @input="replaceInput" placeholder="连续的两个1会变成2" />
        </view>
        <view class="section">
            <input password type="number" />
        </view>
        <view class="section">
            <input password type="text" />
        </view>
        <view class="section">
            <input type="digit" placeholder="带小数点的数字键盘" />
        </view>
        <view class="section">
            <input type="idcard" placeholder="身份证输入键盘" />
        </view>
        <view class="section">
            <input placeholder-style="color:red" placeholder="占位符字体是红色的" />
        </view>
			
		</view>
	</view>
</template>

<script>
export default {
    data: {
        focus: false,
        inputValue: ''
    },
    methods: {
        buttonTap: function () {
            this.focus = true;
        },
        KeyInput: function (e) {
            this.inputValue = e.detail.value;
        },
        replaceInput: function (e) {
            var value = e.detail.value
            var pos = e.detail.cursor
            if (pos != -1) {
                var left = e.detail.value.slice(0, pos)
                pos = left.replace(/11/g, '2').length
            }

            return {
                value: value.replace(/11/g, '2'),
                cursor: pos
            }
        }
    }
}
</script>

<style>

</style>
