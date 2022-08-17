<template>
  <div>
    <span>↓</span>
    <span style="--delay: 0.1s">↓</span>
    <span style="--delay: 0.3s">↓</span>
    <span style="--delay: 0.4s">↓</span>
    <span style="--delay: 0.5s">↓</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes arrows {
  0%,
  100% {
    color: black;
    transform: translateY(0);
  }
  50% {
    color: #3ab493;
    transform: translateY(20px);
  }
}

span {
  --delay: 0s;
  animation: arrows 1s var(--delay) infinite ease-in;
}
</style>
