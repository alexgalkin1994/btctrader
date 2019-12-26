<template>
  <div class="table-content">
    <table>
      <thead>
        <tr>
          <th>Währung</th>
          <th>Kaufpreis</th>
          <th>Verkaufspreis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(price, currency) in currentPrices" :key="currency">
          <td>{{ currency }}</td>
          <td>{{ price.buy }}{{ price.symbol }}</td>
          <td>{{ price.sell }}{{ price.symbol }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PriceOverview",
  props: ["currentPrices"],
  created() {}
};
</script>

<style scoped lang="scss">
.table-content {
  height: 250px;
  width: 100%;
  position: relative;
  overflow: auto;
  height: 100%;
}
table {
  border-collapse: collapse;
  background-color: rgba($color: #ffffff, $alpha: 0.05);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  text-align: center;
  width: 100%;
  height: 100%;

  thead {
  }

  thead tr {
    background-image: linear-gradient(
      340deg,
      rgba($color: #26b681, $alpha: 0.45) 0%,
      rgba($color: #71eeee, $alpha: 0.45) 100%
    );
    font-weight: bold;
  }

  tbody tr {
    z-index: 1;

    transition: all 0.3s;

    &:nth-of-type(even) {
      background-color: rgba($color: #ffffff, $alpha: 0.04);
    }

    &:last-of-type {
      border-bottom: 3px solid rgba($color: #ffffff, $alpha: 0.3);
    }
  }

  th,
  td {
    padding: 12px 15px;
  }
}
</style>
