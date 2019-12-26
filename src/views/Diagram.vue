<template>
  <div v-if="chartDataLoaded" class="content">
    <div class="filter">
      <div class="stat option-to-select">
        <span>Stat:</span>
        <div class="select-dropdown">
          <select @change="getDiagram" v-model="stat">
            <option value="market-price" selected>Marktpreis(USD)</option>
            <option value="total-bitcoins"
              >Gesamtzahl der Bitcoins im Umlauf</option
            >
            <option value="n-transactions">Anzahl von Transaktionen</option>
            <option value="market-cap">Marktkapitalisierung</option>
            <option value="hash-rate">Hashwert</option>
            <option value="difficulty">Schwierigkeitsgrad</option>
          </select>
        </div>
      </div>
    </div>
    <scatter-chart class="chart" :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import axios from "axios";
import ScatterChart from "../components/charts/Chart";
import moment from "moment";

export default {
  name: "Diagrams",
  components: { ScatterChart },
  methods: {
    getDiagram() {
      this.chartDataLoaded = false;
      axios
        .get(
          `https://api.blockchain.info/charts/${this.stat}?timespan=${this.timespan}&rollingAverage=${this.rollingAverage}&cors=true`
        )
        .then(response => {
          const data = response.data.values;
          this.chartData.datasets[0].data = data;
          this.minTime = moment
            .unix(this.chartData.datasets[0].data[0].x)
            .format("DD-MM-YYYY");
          this.chartData.datasets[0].data.forEach(element => {
            element.x = moment.unix(element.x).format("DD-MM-YYYY");
          });

          this.chartDataLoaded = true;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {});
    }
  },
  data() {
    return {
      stat: "market-price",
      timespan: "365days",
      rollingAverage: "24hours",
      chartDataLoaded: false,
      chartData: {
        datasets: [
          {
            label: "Bitcoin Price",
            data: [],
            backgroundColor: ["rgba(239, 126, 196, 0.2)"],
            borderColor: ["rgba(239, 126, 196, 1)"],
            borderWidth: 1,
            showLine: true,
            lineTension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "#f1faff",
                min: 0
              }
            }
          ],
          xAxes: [
            {
              distribution: "series",
              unit: "day",
              unitStepSize: 1,
              ticks: {
                fontColor: "#f1faff"
              },
              type: "time",
              time: {
                format: "DD-MM-YYYY",
                tooltipFormat: "ll",
                autoSkip: true,
                maxTicksLimit: 12
              },
              bounds: "data",
              scaleLabel: {
                display: true,
                labelString: "Date",
                fontColor: "#f1faff"
              }
            }
          ]
        }
      }
    };
  },
  created() {
    axios
      .get(
        "https://api.blockchain.info/charts/market-price?timespan=365days&rollingAverage=24hours&format=json&cors=true"
      )
      .then(response => {
        const data = response.data.values;
        this.chartData.datasets[0].data = data;
        this.minTime = moment
          .unix(this.chartData.datasets[0].data[0].x)
          .format("DD-MM-YYYY");
        this.chartData.datasets[0].data.forEach(element => {
          element.x = moment.unix(element.x).format("DD-MM-YYYY");
        });

        this.chartDataLoaded = true;
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {});
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.filter {
}

.option-to-select {
  display: flex;
}
</style>
