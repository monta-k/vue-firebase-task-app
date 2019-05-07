<template>
  <div class="comment-area">
    <form class="comment-area__form" @submit.prevent="checkForm()">
      <div class="comment-area__form__field">
        <div class="comment-area__form__field__control">
          <textarea class="comment-area__form__field__control__text" name="comment" placeholder="コメント" v-model="new_comment.text" v-validate="'required'"></textarea>
        </div>
      </div>

      <div class="comment-area__form__errors">
        <li class="comment-area__form__errors__message">{{ errors.first('comment') }}</li>
      </div>

      <div class="comment-area__form__field">
        <div class="comment-area__form__field__control">
          <app-btn type="submit" class="comment-area__form__field__control__submit">Submit</app-btn>
        </div>
      </div>
    </form>

    <ul class="comment-area__list">
      <li class="comment-area__list__detail" v-for="comment in task.comments" :key="comment.id">
        <font-awesome-icon icon="trash" style="cursor:pointer" @click="deleteComment(comment.id)" v-if="loginUser.admin === true" />
        <p class="comment-area__list__detail__text">{{ comment.text }}</p>
        <user-icon class="comment-area__list__detail__user" type="mini" :user="comment.user"></user-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import UserIcon from '@/components/UserIcon.vue';
import Task from '../modules/task';

export default {
  data() {
    return {
      new_comment: {
        text: '',
        user: this.loginUser.uid,
      },
    };
  },
  props: {
    task: Object,
    loginUser: Object,
  },
  methods: {
    async submitComment() {
      const add_comment = await Task.createComment(this.task.id, this.new_comment);
      await this.task.comments.unshift({
        ...this.new_comment,
        user: this.loginUser,
        id: add_comment.id,
      });
      this.new_comment.text = '';
      this.$validator.reset();
    },
    checkForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitComment();
        }
      });
    },
    async deleteComment(commentId) {
      if (window.confirm('コメントを削除してもよろしいですか?')) {
        await Task.deleteComment(this.task.id, commentId);
        this.task.comments = this.task.comments.filter(comment => comment.id !== commentId);
      }
    },
  },
  components: {
    AppBtn,
    UserIcon,
  },
};
</script>

<style lang="scss">
  .comment-area {
    border-radius: 20px;
    border: 2px solid $sub-color !important;
    width: 70%;
    margin: 10px auto !important;
    padding: 20px !important;
    &__form {
      margin: auto;
      &__errors {
        color: red;
        &__message {
          list-style: none;
        }
      }
      &__field {
        &__control {
          margin: 10px auto;
          &__text {
            font-size: 16px;
            outline: none;
            height: 100px;
            width: 100%;
            border: 2px solid $sub-color;
            border-radius: 5px;
          }
          &__submit {
            font-size: 22px;
            width: 100px;
          }
        }
      }
    }
    &__list{
      margin: auto;
      &__detail {
        border-bottom: 1px dashed $sub-color;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        margin: 5px 0;
        &__text {
          width: 80%;
          white-space: pre-wrap;
          text-align: left;
        }
      }
    }
  }
</style>
