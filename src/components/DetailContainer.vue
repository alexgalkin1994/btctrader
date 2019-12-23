<template>
  <div class="container">
    <div class="title">{{ detail.name }}</div>
    <div class="amount">{{ detail.amount }}</div>
  </div>
</template>

<script>
export default {
  name: "DetailContainer",
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  box-sizing: border-box;
  margin-bottom: 40px;
  background-image: linear-gradient(45deg, #7a4bfd 0%, #ef7ec4 100%);
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  height: 165px;
  box-shadow: 3px 4px 5px rgba($color: #0e0e0e, $alpha: 0.7);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 5px 6px 7px rgba($color: #0e0e0e, $alpha: 0.9);
  }
}

.title {
  margin-bottom: 10px;
  font-size: 1.25rem;
}

.amount {
  font-size: 3rem;
  font-weight: bold;
}

.percentage {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
