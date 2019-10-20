<template>
<eh-layout>
  <h1>Conectamos personas. Cosechamos riqueza</h1>
  <p>Inversiones desde 50€ en comunidades agrícolas <br />
    productivas y rentables de todo el mundo sed do eiusmod</p>
  <el-row v-if="isMobile()">
    <el-col :span="24" v-for="(communities, communityIndex) in info">
      <router-link :to="{ name:'detail', params:{communityID: communities.id, amount: options[amountInvestments[communityIndex]]}}">
        <h3 class="name">{{ communities.name }}</h3>
      </router-link>
      <div class="cards">
        <el-card :body-style="{ padding: '0' }" shadow="always">
          <img :src="communities.image" class="image">
        </el-card>
        <div class="info mobile" shadow="always">
          <h5>{{`Faltan € ${(communities.project.goal - communities.project.contributed).toFixed(3)}`}}</h5>
          <el-progress :percentage="getPercentage(communities.project.goal, communities.project.contributed)" color="primary" :show-text="false"></el-progress>
          <h4>{{ communities.project.name }}</h4>
          <div class="buttomD clearfix">
            <el-button type="success" @click="invest(communities.id, communityIndex)" class="investButton">
              <router-link :to="{ name:'detail', params:{communityID: communities.id, amount: options[amountInvestments[communityIndex]]}}"><strong>INVERTIR</strong></router-link>
              <el-dropdown @command="setIndex">
                <el-button type="white" class="drop_mobile">
                  {{`€ ${options[amountInvestments[communityIndex]]}`}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(option, amountIndex) in options" :command="{amountIndex, communityIndex}"> {{`€ ${option}`}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
          </div>
          <span> RECIBIRÁS +{{ communities.project.interest }}%</span>
          <p class="footer">(Interés anual en moneda local)</p>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row v-else :gutter="20">
    <el-col :span="6" v-for="(communities, communityIndex) in info" shadow="always" class="card">
      <router-link :to="{ name:'detail', params:{communityID: communities.id, amount: options[amountInvestments[communityIndex]]}}">
        <h3 class="name">{{ communities.name }}</h3>
      </router-link>
      <div class="cards">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <img :src="communities.image" class="image">
        </el-card>
        <div class="info desktop">
          <h5>{{`Faltan € ${(communities.project.goal - communities.project.contributed).toFixed(3)}`}}</h5>
          <el-progress :percentage="getPercentage(communities.project.goal, communities.project.contributed)" color="primary" :show-text="false"></el-progress>
          <h4>{{ communities.project.name }}</h4>
          <div class="buttomD clearfix">
            <el-button type="success" class="investButton">
              <router-link :to="{ name:'detail', params:{communityID: communities.id, amount: options[amountInvestments[communityIndex]]}}"><strong>INVERTIR</strong></router-link>
              <el-dropdown @command="setIndex">
                <el-button type="white" class="drop_desktop">
                  {{`€ ${options[amountInvestments[communityIndex]]}`}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(option, amountIndex) in options" :command="{amountIndex, communityIndex}"> {{`€ ${option}`}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
          </div>
          <span> RECIBIRÁS +{{ communities.project.interest }}%</span>
          <p class="footer">(Interés anual en moneda local)</p>
        </div>
      </div>
    </el-col>
  </el-row>
</eh-layout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'

export default {
  name: 'Communities',
  data() {
    return {
      info: [],
      amountInvestments: [],
      options: [
        25, 50, 100
      ]
    }
  },
  mounted() {
    axios
      .get('/communities/')
      .then(response => {
        this.info = response.data
        //this "for" is to creat a dropdown per object
        for (let i = 0; i < this.info.length; i++) {
          //start the dropdown with element 0
          this.amountInvestments.push(0);
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  methods: {
    getPercentage: function(goal, contributed) {
      return parseFloat(((100 * contributed) / goal).toFixed(2))
    },
    isMobile: function() {
      if (navigator.userAgent.includes('Android') ||
        navigator.userAgent.includes('webOS') ||
        navigator.userAgent.includes('Phone') ||
        navigator.userAgent.includes('Pad') ||
        navigator.userAgent.includes('Pod') ||
        navigator.userAgent.includes('BlackBerry') ||
        navigator.userAgent.includes('Windows Phone')
      ) {
        return true;
      } else {
        return false;
      }
    },
    setIndex: function(indexs) {
      //used to change the value on dropdown only in the selected community
      this.$set(this.amountInvestments, indexs.communityIndex, indexs.amountIndex);
    }
  },
  components: {
    'eh-layout': BaseLayout
  }
}
</script>

<style lang="scss" scoped>

/*************general*************/
  /****class****/
.buttomD {
  margin: 8%;
  text-align: center;
}

.cards {
  margin-bottom: 8%;
  background-color: ghostwhite;
  text-align: -webkit-center;
  text-align: -moz-center;
  height: 440px;
}

.clearfix:after,
.clearfix:before {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.footer {
  font-size: 10px;
}

.image {
  width: 100%;
  display: flex;
  object-fit: cover;
  height: 200px;
}

.info {
  padding: 15px;
  text-align: center;
  width: 90%;
  position: relative;
  margin-top: -10%;
  background-color: white;
  box-sizing: border-box;
  border-radius: 2%;
}

.investButton{
  position: relative;
  width: 100%
}

.name {
  height: 25px;
}

/***tags****/
a {
  color: primary;
}

h4 {
    margin: 20%, 5%;
    height: 10%;
}

h5{
  margin: 3%;
}

/*************mobile*************
.drop_mobile{
  padding: 15%;
}

.mobile {
  height: 240px;
}

/*************desktop*************/
  /****class***/
.card {
  margin: 20px 0;
}

.desktop {
  height: 250px;
}

.drop_desktop{
  padding: 10%;
}

</style>
