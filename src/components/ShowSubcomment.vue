<template>
  <div>
    <div class="subcomment">
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
          <p class="subconpm run servemment-body">
            <span class="replied">@{{ subcomment.replied }} </span>
            {{ subcomment.body }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="active">
      <AddReply :id="id" :replied="user.username" @subcomment="goComment" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddReply from "./AddReply.vue";
import Loader from "./Loader.vue";
export default {
  props: ["subcomment", "id"],
  components: { AddReply, Loader },
  data() {
    return {
      user: null,
      active: false,
    };
  },
  async created() {
    await axios
      .get(
        "https://productfeedback-app-api.herokuapp.com/api/users/" +
          this.subcomment.user_id
      )
      .then((response) => {
        this.user = response.data;
      });
  },

  methods: {
    goComment(subcomment) {
      this.$emit("subcomment", subcomment);
      this.active = false;
    },
  },
};
</script>

<style>
.subcomment {
  margin-top: 32px;
  padding-left: 45px;
}

.subcomment-body {
  font-size: 15px;
  line-height: 21.7px;
}

.replied {
  font-weight: 700;
  color: #ad1fea;
}
</style>
