<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    this.cropper = new Cropper(this.$refs.img, {
      viewMode: 1, // 查看模式，裁剪框只能在图像内移动
      dragMode: 'move', // 后面的图片才可以拖动
      aspectRatio: 1, // 正方形
      autoCropArea: 1, // 在保持比例的情况下自动截取最大尺寸
      cropBoxMovable: false, // 截图区域是否可以移动
      cropBoxResizable: false, // 固定截图区域的大小，不允许拉大拉小
      background: false // 不需要背景
    })
  },
  methods: {
    onConfirm () {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true, // 禁止背景点击
          duration: 0 // 持续展示
        })
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    min-width: 100%;
  }
  .toolbar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .cancel,.confirm {
      color: #fff;
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
