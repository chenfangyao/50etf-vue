<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
@import "./common/uni.css";
page>view {
  padding-top: var(--status-bar-height);
}
</style>
