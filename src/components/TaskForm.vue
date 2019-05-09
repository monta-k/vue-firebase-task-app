<template>
  <form  class="task-form" autocomplete="off" @submit.prevent="checkForm()">

    <div class="task-form__errors">
      <li class="task-form__errors__message">{{ errors.first('name') }}</li>
      <li class="task-form__errors__message">{{ errors.first('priority') }}</li>
      <li class="task-form__errors__message">{{ errors.first('progress') }}</li>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <input class="task-form__field__control__input" name="name" type="text" placeholder="タスク名" v-model="task.name" v-validate="'required'">
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <label for="priority" class="task-form__field__control__label">優先度</label>
        <select name="priority" class="task-form__field__control__select" id="priority" v-model="task.priority" v-validate="'required'">
          <option value="0">低</option>
          <option value="10" selected>中</option>
          <option value="20">高</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <label for="progress" class="task-form__field__control__label">進捗</label>
        <select name="progress" class="task-form__field__control__select" id="progress" v-model="task.progress" v-validate="'required'">
          <option value="0" selected>ToDo</option>
          <option value="10">InProgress</option>
          <option value="20">Done</option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <label for="assigned_user" class="task-form__field__control__label">担当者</label>
        <select name="assigned_user" class="task-form__field__control__select" id="assigned_user" v-model="task.assigned_user.uid">
          <option value=''>担当者なし</option>
          <option v-for="user in allUsers" :value="user.uid" :key="user.uid">
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="task-form__field">
      <div class="task-form__field__control">
        <textarea class="task-form__field__control__text" name="詳細" placeholder="詳細" v-model="task.detail"></textarea>
      </div>
    </div>

    <div class="task-form__file">
      <input class="task-form__file__form" type="file" @change="selectFile">
      <li v-for="file in task.files" :key="file.id">
        <a :href="file.path" target="__blank">{{ file.name }}</a>
      </li>
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
import Uploader from '../modules/uploader';

export default {
  data() {
    return {
      uploadFile: null,
    };
  },
  props: {
    allUsers: Array,
    loginUser: Object,
    task: Object,
  },
  computed: {
    editedTask() {
      const { comments, files, ...result } = this.task;
      return result;
    },
  },
  methods: {
    async submitTask() {
      try {
        const submitedTask = await Task.submitTask(this.editedTask, this.loginUser);
        if (this.uploadFile) {
          await Uploader.fileUpload(submitedTask.id, this.uploadFile);
        }
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
    selectFile(e) {
      const [targetFile] = e.target.files;
      this.uploadFile = targetFile;
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
        &__label {
          width: 10%;
          display: inline-block;
          text-align: left;
        }
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
          width: 90%;
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
    &__file {
      margin: 0 auto;
      width: 60%;
      text-align: left;
      &__form {
        display: block;
        margin: 5px 0;
      }
    }
  }
</style>
