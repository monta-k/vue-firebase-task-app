<template>
  <form  class="task-form" @submit.prevent="checkForm()">

    <div class="task-form__errors">
      <li class="task-form__errors__message">{{ errors.first('タスク名') }}</li>
      <li class="task-form__errors__message">{{ errors.first('優先度') }}</li>
      <li class="task-form__errors__message">{{ errors.first('進捗') }}</li>
      <li class="task-form__errors__message">{{ errors.first('担当者') }}</li>
      <li class="task-form__errors__message">{{ errors.first('詳細') }}</li>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <input class="task-form__field__control__input" name="タスク名" type="text" placeholder="タスク名" v-model="task.name" v-validate="'required'">
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <select name="優先度" class="task-form__field__control__select" v-model="task.priority" v-validate="'required'">
          <option value='' disabled selected style='display:none;'>優先度</option>
          <option value="0">低</option>
          <option value="10">中</option>
          <option value="20">高</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <select name="進捗" class="task-form__field__control__select" v-model="task.progress" v-validate="'required'">
          <option value='' disabled selected style='display:none;'>進捗</option>
          <option value="0">ToDo</option>
          <option value="10">InProgress</option>
          <option value="20">Done</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <select name="担当者" class="task-form__field__control__select" v-model="task.assigned_user.uid" v-validate="'required'">
          <option value='' disabled selected style='display:none;'>担当者</option>
          <option v-for="user in allUsers" :value="user.uid" :key="user.uid">
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <textarea class="task-form__field__control__text" name="詳細" placeholder="詳細" v-model="task.detail" v-validate="'required'"></textarea>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <app-btn type="submit" class="task-form__field__control__submit">Submit</app-btn>
      </div>
    </div>
  </form>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import Task from '../modules/task';

export default {
  props: {
    allUsers: Array,
    loginUser: Object,
    task: Object,
  },
  methods: {
    async submitTask() {
      try {
        await Task.submitTask(this.task, this.loginUser);
        console.log('task successfully update!');
        this.$router.replace('/');
      } catch (e) {
        console.error('Error update task: ', e);
      }
    },
    checkForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
         this.submitTask();
        }
      });
    },
  },
  components: {
    AppBtn,
  },
};
</script>

<style lang="scss" scoped>
  .task-form {
    &__errors {
      color: red;
      &__message {
        list-style: none;
      }
    }
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
