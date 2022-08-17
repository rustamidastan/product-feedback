<template>
  <div class="comment-wrapper">
    <div v-if="user" class="comment">
      <div class="top">
        <div class="comment-user-info">
          <div class="comment-user-info-img-wrapper">
            <img src="../assets/user40.png" />
          </div>

          <div class="user-details">
            <span class="name">{{ user.name }}</span>
            <span class="username">@{{ user.username }}</span>
          </div>
        </div>

        <button class="reply-btn" @click="active = true">Reply</button>
      </div>

      <div class="comment-body">
        {{ comment.body }}
      </div>
    </div>

    <div v-if="subcomments" class="subcomment-wrapper">
      <div v-for="subcomment in subcomments" :key="subcomment.id">
        <ShowSubcomment
          :subcomment="subcomment"
          :id="comment.id"
          @subcomment="addSubcomment"
        />
      </div>
    </div>

    <div v-if="active">
      <AddReply
        :id="comment.id"
        :replied="user.username"
        @subcomment="addSubcomment"
      />
    </div>
  </div>
</template>

<script>
import ShowSubcomment from "./ShowSubcomment.vue";
import AddReply from "./AddReply.vue";
import axios from "axios";
export default {
  props: ["comment"],
  comments: { ShowSubcomment, AddReply },
  data() {
    return {
      user: null,
      subcomments: [],
      active: false,
    };
  },
  async created() {
    await axios
      .get(
        "https://productfeedback-app-api.herokuapp.com/api/users/" +
          this.comment.user_id
      )
      .then((response) => {
        this.user = response.data;
      });

    await axios
      .get("https://productfeedback-app-api.herokuapp.com/api/subcomments")
      .then((response) => {
        this.subcomments = response.data.filter((item) => {
          if (item.comment_id == this.comment.id) {
            return item;
          }
        });
      });
  },
  methods: {
    goo() {
      console.log(this.comment.id);
    },

    addSubcomment(subcomment) {
      this.subcomments.push(subcomment);
      this.active = false;
    },
  },
  components: { ShowSubcomment, AddReply },
};
</script>

<style>
.comment-wrapper {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(140, 146, 179, 0.25);
}

.comment-user-info {
  display: flex;
  align-items: center;
}
.comment-user-info-img-wrapper {
  width: 40px;
  height: 40px;
  display: inline-block;
  padding: 2px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--home-header-bg);
  overflow: hidden;
}
.comment-user-info .user-details span {
  display: block;
  font-size: 14px;
  line-height: 20px;
}

.comment-user-info .name {
  font-weight: 700;
  letter-spacing: -0.2px;
  color: var(--home-header-bg);
}

.reply-btn {
  display: inline-block;
  font-size: 13px;
  line-height: 18.7px;
  font-weight: 600;
  color: #4661e6;
  border: none;
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.reply-btn:hover {
  text-decoration: underline;
}

.comment .top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
}

.comment-body {
  padding-left: 72px;
}
</style>
