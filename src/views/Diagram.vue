<template>
  <div v-if="chartDataLoaded" class="diagram-content">
    <scatter-chart class="chart" :chartData="chartData" :options="options" />
    <div class="filter">
      <div class="stat-options option-to-select">
        <label
          ><input
            type="radio"
            id="market-price"
            value="market-price"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span">Marktpreis (USD)</span>
        </label>

        <label
          ><input
            type="radio"
            id="total-bitcoins"
            value="total-bitcoins"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span"
            >Gesamtzahl der Bitcoins im Umlauf</span
          ></label
        >

        <label
          ><input
            type="radio"
            id="n-transactions"
            value="n-transactions"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span">Anzahl von Transaktionen</span></label
        >

        <label
          ><input
            type="radio"
            id="market-cap"
            value="market-cap"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span">Marktkapitalisierung</span></label
        >

        <label
          ><input
            type="radio"
            id="hash-rate"
            value="hash-rate"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span">Hashwert</span></label
        >

        <label>
          <input
            type="radio"
            id="difficulty"
            value="difficulty"
            v-model="stat"
            @change="getDiagram"
          />
          <span class="radio-span" for="difficulty"
            >Schwierigkeitsgrad</span
          ></label
        >
      </div>

      <div class="timespan-options option-to-select">
        <label
          ><input
            type="radio"
            id="30days"
            value="30days"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">30 Tage</span>
        </label>

        <label
          ><input
            type="radio"
            id="60days"
            value="60days"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">60 Tage</span>
        </label>

        <label
          ><input
            type="radio"
            id="180days"
            value="180days"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">180 Tage</span>
        </label>

        <label
          ><input
            type="radio"
            id="1year"
            value="1year"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">1 Jahr</span>
        </label>

        <label
          ><input
            type="radio"
            id="2years"
            value="2years"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">2 Jahre</span>
        </label>

        <label
          ><input
            type="radio"
            id="all"
            value="all"
            v-model="timespan"
            @change="getDiagram"
          />
          <span class="radio-span">Gesamt</span>
        </label>
      </div>
    </div>
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
      if (this.stat === "market-price") {
        this.chartData.datasets[0].label = "Marktpreis (USD)";
      } else if (this.stat === "total-bitcoins") {
        this.chartData.datasets[0].label = "Gesamtzahl der Bitcoins im Umlauf";
      } else if (this.stat === "n-transactions") {
        this.chartData.datasets[0].label = "Anzahl der Transaktionen per Tag";
      } else if (this.stat === "market-cap") {
        this.chartData.datasets[0].label = "Marktkapitalisierung";
      } else if (this.stat === "hash-rate") {
        this.chartData.datasets[0].label = "Hashwert";
      } else if (this.stat === "difficulty") {
        this.chartData.datasets[0].label = "Schwierigkeitsgrad";
      }

      axios
        .get(
          `https://api.blockchain.info/charts/${this.stat}?timespan=${this.timespan}&cors=true`
        )
        .then(response => {
          const data = response.data.values;
          this.chartData.datasets[0].data = data;
          console.log(this.chartData.datasets);
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
      timespan: "30days",
      rollingAverage: "24hours",
      chartDataLoaded: false,
      chartData: {
        datasets: [
          {
            label: "Marktpreis(USD)",
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
        legend: {
          labels: {
            fontColor: "#f1faff"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "#f1faff"
              }
            }
          ],
          xAxes: [
            {
              distribution: "series",

              ticks: {
                fontColor: "#f1faff"
              },
              type: "time",
              time: {
                format: "DD-MM-YYYY",
                unit: "day",
                displayFormats: {
                  day: "DD MMM YYYY"
                },
                tooltipFormat: "ll",
                autoSkip: true,
                maxTicksLimit: 1
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
    this.getDiagram();
  }
};
</script>

<style scoped lang="scss">
$text-color: #f1faff;
$background-color: #262640;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);

.wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.chart {
  width: 100%;
  height: 100%;
}

.diagram-content {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 100px;
  margin-top: 3rem;
}
.filter {
  margin-top: 1rem;
}

.option-to-select {
  display: flex;
  justify-content: space-between;
}

.stat-options {
  margin-bottom: 2rem;
}
</style>
