<template>
  <div class="user-index-page">
    <div class="user-index-page__user-lists">
      <div class="user-index-page__user-lists__no-admin">
        <h1 class="user-index-page__user-lists__no-admin__title"><font-awesome-icon icon="user" /> 利用承認待ちユーザー</h1>
        <user-list :users="noAdminUsers" @click="registerUser" :loginUser="loginUser">承認</user-list>
      </div>
      <div class="user-index-page__user-lists__admin">
        <h1 class="user-index-page__user-lists__admin__title"><font-awesome-icon icon="user-check" /> 利用承認済みユーザー</h1>
        <user-list :users="adminUsers" @click="deleteUser" :btnVariation="'danger'" :loginUser="loginUser">削除</user-list>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue'
import User from '../modules/user'

export default {
  props: {
    allUsers: Array,
    loginUser: Object,
  },
  computed: {
    noAdminUsers() {
      return this.allUsers.filter(user => user.available === false)
    },
    adminUsers() {
      return this.allUsers.filter(user => user.available === true)
    },
  },
  methods: {
    async registerUser(userId) {
      await User.registerUser(userId)
      this.allUsers.find(user => user.uid === userId).available = true
    },
    async deleteUser(userId) {
      if (window.confirm('ユーザーを削除してもよろしいですか?')) {
        await User.deleteUser(userId)
        this.allUsers = this.allUsers.filter(user => user.uid !== userId)
      }
    },
  },
  created() {
    if (this.loginUser.admin === false) {
      this.$router.replace('/')
    }
  },
  components: {
    UserList,
  },
}
</script>

<style lang="scss">
  .user-index-page {
    position: absolute;
    top: 72px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    &__user-lists {
      width: 70%;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 15px;
      margin: 50px auto 50px auto;
      &__no-admin {
        grid-column: 6 span;
        &__title {
          font-size: 32px;
          font-weight: bold;
        }
      }
      &__admin {
        grid-column: 6 span;
        &__title {
          font-size: 32px;
          font-weight: bold;
        }
      }
    }
  }
</style>
