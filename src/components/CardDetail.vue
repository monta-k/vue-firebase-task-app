<template>
  <div class="card-detail" v-if="task">
    <div class="card-detail__head">
      <p class="card-detail__head__title">{{ task.name }}</p>
      <user-icon class="card-detail__head__user" type="mini" :user="task.registered_user"></user-icon>
    </div>
    <div class="card-detail__detail"><p>{{ task.detail }}</p></div>

    <div class="card-detail__files">
      <li class="card-detail__files__single" v-for="file in task.files" :key="file.id">
        <font-awesome-icon class="card-detail__files__single__trash" icon="trash" style="cursor:pointer" @click="deleteFile(file)" v-if="loginUser.admin === true" />
        <a :href="file.path" target="__blank">{{ file.name }}</a>
      </li>
    </div>

    <div class="card-detail__foot">
      <p class="card-detail__foot__priority">優先度: {{ priority }}</p>
      <user-icon class="card-detail__foot__user" type="mini" :user="task.assigned_user"></user-icon>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon.vue'
import Uploader from '../modules/uploader'

export default {
  props: {
    task: Object,
    loginUser: Object,
  },
  computed: {
    priority() {
      let priority = ''
      switch (this.task.priority) {
        case '0':
          priority = '低'
          break
        case '10':
          priority = '中'
          break
        case '20':
          priority = '高'
          break
        default:
      }
      return priority
    },
  },
  methods: {
    async deleteFile(deleteFile) {
      if (window.confirm('コメントを削除してもよろしいですか?')) {
        await Uploader.fileDelete(this.task.id, deleteFile)
        this.task.files = this.task.files.filter(file => file.id !== deleteFile.id)
      }
    },
  },
  components: {
    UserIcon,
  },
}
</script>

<style lang="scss">
  .card-detail {
    width: 70%;
    margin: 100px auto 0 auto !important;
    padding: 20px !important;
    border-radius: 20px;
    border: 2px solid $sub-color !important;
    background-color: white;
    &__head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px 0;
      &__title {
        font-size: 22px;
        display: inline-block;
        margin: 0;
        padding-top: 10px;
        width: 80%;
        text-align: left;
      }
    }
    &__detail {
      text-align: left;
      margin: 20px 0;
      padding: 5px;
      white-space: pre-wrap;
      border-top: 1px solid $sub-color;
      border-bottom: 1px solid $sub-color;
    }
    &__files {
      text-align: left;
      &__single {
        list-style: none;
        margin-bottom: 5px;
        &__trash {
          margin-right: 10px;
        }
      }
    }
    &__foot {
      display: flex;
      justify-content: flex-end;
      padding: 10px 0;
      &__priority {
        margin-right: 20px;
        line-height: 50px;
      }
    }
  }
</style>
