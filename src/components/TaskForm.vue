<template>
  <form  class="task-form">
    <div class="task-form__field">
      <div class="task-form__field__control">
        <input class="task-form__field__control__input" type="text" placeholder="タスク名">
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <select name="priority" class="task-form__field__control__select">
          <option value='' disabled selected style='display:none;'>優先度</option>
          <option value="0">低</option>
          <option value="1">中</option>
          <option value="2">高</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <select name="priority" class="task-form__field__control__select">
          <option value='' disabled selected style='display:none;'>担当者</option>
          <option value="0">ユーザー1</option>
          <option value="1">ユーザー2</option>
          <option value="2">ユーザー3</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <textarea class="task-form__field__control__text" placeholder="詳細"></textarea>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <Btn type="submit" class="task-form__field__control__submit">Submit</Btn>
      </div>
    </div>
  </form>
</template>

<script>
import Btn from '@/components/Btn.vue';

export default {
  components: {
    Btn,
  },
};
</script>

<style lang="scss" scoped>
  .task-form {
    &__field {
      padding: 10px 0;
      &__control {
        margin: 0 auto;
        width: 60%;
        &__input {
          font-size: 16px;
          outline: none;
          height: 40px;
          width: 100%;
          border: none;
          border-bottom: 2px solid $sub-color;
          background-color: rgba(0,0,0,0);
        }
        &__select {
          font-size: 16px;
          outline: none;
          height: 40px;
          width: 100%;
          border: none;
          border-bottom: 2px solid $sub-color;
          border-radius: 0;
          background-color: rgba(0,0,0,0);
        }
        &__text {
          font-size: 16px;
          outline: none;
          height: 100px;
          width: 100%;
          border: 2px solid $sub-color;
          border-radius: 5px;
        }
      }
    }
  }
</style>
