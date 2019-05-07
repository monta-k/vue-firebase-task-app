<template>
  <div class="user-list">
    <div class="user-list__single" v-for="user in users" :key="user.uid">
      <user-icon class="user-list__single__icon" type="mini" :user="user"></user-icon>
      <app-btn class="user-list__single__btn" @click="handleClick(user.uid)"><slot /></app-btn>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon.vue';
import AppBtn from '@/components/AppBtn.vue';

export default {
  props: {
    users: Array,
  },
  methods: {
    handleClick(userId) {
      this.$emit('click', userId);
    },
  },
  components: {
    UserIcon,
    AppBtn,
  },
};
</script>

<style lang="scss">
  .user-list {
    &__single {
      background-color: white;
      border-radius: 10px;
      color: $sub-color;
      margin: 5px auto;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      width: 70%;
    }
  }
</style>
