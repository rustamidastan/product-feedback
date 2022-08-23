<template>
  <div class="navbar-roadmap">
    <div class="top">
      <h3>Roadmap</h3>
      <router-link to="/">View</router-link>
    </div>

    <ul class="navbar-roadmap-list">
      <li class="navbar-roadmap-item">
        <span class="roadmap-title">Planed</span>
        <span class="roadmap-amount">{{ roadmap.planed.length }}</span>
      </li>
      <li class="navbar-roadmap-item">
        <span class="roadmap-title">In-Progress</span>
        <span class="roadmap-amount">{{ roadmap.inProgress.length }}</span>
      </li>
      <li class="navbar-roadmap-item">
        <span class="roadmap-title">Live</span>
        <span class="roadmap-amount">{{ roadmap.live.length }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roadmap: {
        planed: 0,
        inProgress: 0,
        live: 0,
        suggestion: 0,
      },
    };
  },

  mounted() {
    let roadmap = {
      suggestion: [],
      planed: [],
      inProgress: [],
      live: [],
    };

    this.$store.state.feedbacks.filter((item) => {
      if (item.roadmap_status == "Suggestion") {
        roadmap.suggestion.push(item);
      }
      if (item.roadmap_status == "Planed") {
        roadmap.planed.push(item);
      }
      if (item.roadmap_status == "In-Progress") {
        roadmap.inProgress.push(item);
      }
      if (item.roadmap_status == "Live") {
        roadmap.live.push(item);
      }
    });

    // this.$store.commit("SET_ROADMAP", roadmap);
    this.roadmap = roadmap;
  },
};
</script>

<style>
.navbar-roadmap {
  width: 255px;
  background-color: var(--white);
  padding: 24px;
  border-radius: 10px;
}

.navbar-roadmap .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.navbar-roadmap .top h3 {
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  color: var(--heading-color);
}

.navbar-roadmap .top a {
  font-size: 13px;
  font-weight: 600;
  line-height: 18.7px;
  color: var(--nav-links-color);
}

.navbar-roadmap-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-roadmap-item {
  display: flex;
  align-items: center;
}

.navbar-roadmap-item .roadmap-amount {
  display: block;
  margin-left: auto;
  font-weight: 700;
}

.navbar-roadmap-item::before {
  width: 8px;
  height: 8px;
  margin-right: 16px;
  border-radius: 50%;
  content: "";
}

.navbar-roadmap-item:first-child::before {
  background-color: var(--planed);
}

.navbar-roadmap-item:nth-child(2)::before {
  background-color: var(--in-progress);
}

.navbar-roadmap-item:last-child::before {
  background-color: var(--live);
}

.navbar-roadmap-item:not(:last-child) {
  margin-bottom: 8px;
}
</style>
