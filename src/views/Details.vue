<template>
  <div class="details">
    <!-- <div class="title">Details</div> -->
    <div class="content">
      <!-- loop over stats array to get all the avaiable stats -->
      <DetailContainer
        v-for="detail in details"
        :key="detail.id"
        :detail="detail"
        @click.native="$router.push({ name: 'diagram' })"
      />
    </div>
  </div>
</template>

<script>
import DetailContainer from "@/components/DetailContainer.vue";
import axios from "axios";

export default {
  name: "Details",
  components: { DetailContainer },
  data() {
    return {
      // All of the stats are set to 0 initially
      details: [
        {
          id: 1,
          name: "Marktkapitalisierung",
          amount: "0 EUR"
        },
        { id: 2, name: "Umlaufversorgung", amount: "0 BTC" },
        {
          id: 3,
          name: "Anzahl der Transaktionen in den letzten 24 Stunden",
          amount: "0"
        },
        {
          id: 4,
          name: "Anzahl gesendeter Bitcoin in den letzten 24 Stunden",
          amount: "0 BTC"
        },
        { id: 5, name: "Hashrate", amount: "0 ETH/s" },
        { id: 6, name: "Schwierigkeit", amount: "0" }
      ],

      // URLs for API Calls
      marketcapURL: "https://blockchain.info/q/marketcap",
      totalbcURL: "https://blockchain.info/q/totalbc",
      transactioncountURL: "https://blockchain.info/q/24hrtransactioncount",
      btcsentURL: "https://blockchain.info/q/24hrbtcsent",
      hashrateURL: "https://blockchain.info/q/hashrate",
      getdifficultyURL: "https://blockchain.info/q/getdifficulty",
      stopPolling: false
    };
  },
  methods: {
    pollData() {
      // Prevent polling after element is destroyed / different page was loaded
      if (this.stopPolling) return;

      // Get all the stats from the API
      const marketcapReq = axios.get(this.marketcapURL);
      const totalbcReq = axios.get(this.totalbcURL);
      const transactioncountReq = axios.get(this.transactioncountURL);
      const btcsentReq = axios.get(this.btcsentURL);
      const hashrateReq = axios.get(this.hashrateURL);
      const getdifficultyReq = axios.get(this.getdifficultyURL);

      axios
        .all([
          marketcapReq,
          totalbcReq,
          transactioncountReq,
          btcsentReq,
          hashrateReq,
          getdifficultyReq
        ])
        .then(
          axios.spread((...responses) => {
            const marketcapRes = responses[0];
            const totalbcRes = responses[1];
            const transactioncountRes = responses[2];
            const btcsentRes = responses[3];
            const hashrateRes = responses[4];
            const getdifficultyRes = responses[5];

            const satoshi = 100000000;
            this.details[0].amount =
              marketcapRes.data.toLocaleString() + " EUR";
            this.details[1].amount =
              (totalbcRes.data / satoshi).toLocaleString() + " BTC";
            this.details[2].amount = transactioncountRes.data.toLocaleString();
            this.details[3].amount =
              (btcsentRes.data / satoshi).toLocaleString() + " BTC";
            this.details[4].amount =
              hashrateRes.data.toLocaleString() + " EH/s";
            this.details[5].amount = getdifficultyRes.data.toLocaleString();
          })
        )
        .catch(errors => {
          console.log(errors);
        });
      // Refresh every 5 minutes
      setTimeout(this.pollData, 300000);
    }
  },
  created() {
    this.pollData();
  },
  beforeDestroy() {
    this.stopPolling = true;
  }
};
</script>

<style lang="scss" scoped>
.details {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  margin: 0;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
  justify-content: center;
  align-content: center;
  padding: 65px 0;
}

.title {
  font-size: 3rem;
  font-weight: 300;
  margin: 30px 0;
}
</style>
