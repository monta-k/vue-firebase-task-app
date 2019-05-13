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

    <div class="task-form__file-area">
      <label class="task-form__file-area__label" for="file_upload" v-if="uploadFiles.length + task.files.length < 3">
        <font-awesome-icon icon="arrow-circle-up" />
        アップロードファイルを追加(1ファイル5MBまで)
        <input class="task-form__file-area__label__form" id="file_upload" type="file" @change="selectFile">
      </label>
      <p class="task-form__file-area__message" v-else>アップロードできるファイルは3つまでです</p>
      
      <li class="task-form__file-area__upload-files" v-for="uploadFile in uploadFiles" :key="uploadFile.name">
        <font-awesome-icon class="task-form__file-area__upload-files__trash" icon="trash" style="cursor:pointer" @click="cancelUpload(uploadFile)" />
        <p class="task-form__file-area__upload-files__name">{{ uploadFile.name }}</p>
      </li>

      <li class="task-form__file-area__files" v-for="file in task.files" :key="file.id">
        <a class="task-form__file-area__files__name" :href="file.path" target="__blank">{{ file.name }}</a>
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
import AppBtn from '@/components/AppBtn.vue'
import Task from '../modules/task'
import Uploader from '../modules/uploader'

export default {
  data() {
    return {
      uploadFiles: [],
    }
  },
  props: {
    allUsers: Array,
    loginUser: Object,
    task: Object,
  },
  computed: {
    editedTask() {
      const { comments, files, ...result } = this.task
      return result
    },
  },
  methods: {
    async submitTask() {
      try {
        const submitedTask = await Task.submitTask(this.editedTask, this.loginUser)
        if (this.uploadFiles.length > 0) {
          await Uploader.fileUpload(submitedTask.id, this.uploadFiles)
        }
        console.log('task successfully update!')
        this.$router.replace('/')
      } catch (e) {
        console.error('Error update task: ', e)
      }
    },
    async checkForm() {
      const result = await this.$validator.validateAll()
      if (result && this.uploadFiles.length + this.task.files.length < 4) {
        this.submitTask()
      }
    },
    selectFile(e) {
      const file = e.target.files[0]
      if (file.size < 5242880 && ![...this.uploadFiles, ...this.task.files].find(findFile => findFile.name === file.name)) {
        this.uploadFiles.push(file)
      }
    },
    cancelUpload(uploadFile) {
      this.uploadFiles = this.uploadFiles.filter(file => file.name !== uploadFile.name)
    },
  },
  components: {
    AppBtn,
  },
}
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
    &__file-area {
      margin: 0 auto;
      width: 60%;
      text-align: left;
      &__label {
        display: inline-block;
        background-color: $sub-color;
        color: white;
        padding: 10px 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        cursor: pointer;
        &__form {
          display: none;
          margin: 5px 0;
        }
      }
      &__upload-files {
        list-style: none;
        margin-bottom: 5px;
        &__trash {
          margin-right: 10px;
        }
        &__name {
          display: inline-block;
        }
      }
      &__files {
        list-style: none;
        margin-bottom: 5px;
      }
    }
  }
</style>
