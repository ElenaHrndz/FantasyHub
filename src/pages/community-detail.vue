<template>
<eh-layout>
  <el-row v-if="isMobile()">
    <el-col :span="24" class="detail">
      <img :src="community.image" class="image">
      <el-card :body-style="{ padding: '20px' }" class="box-card-mobile">
        <div class="clearfix" style="text-align-last: justify;">
          <span>Meta <h4>{{ community.project.goal }}€</h4></span>
          <hr>
          <span>Interes anual en moneda local <h4>{{ community.project.interest }}%</h4></span>
          <hr>
          <span>Faltan <h4>{{ (community.project.goal - community.project.contributed) }}€</h4></span>
          <el-progress :percentage="getPercentage(community.project.goal, community.project.contributed)" color="primary" :show-text="false"></el-progress>
        </div>
        <div class="button">
          <el-button type="success" @click="showModal = true"><strong>CONTRIBUIR</strong></el-button>
        </div>
      </el-card>
      <h2>{{ community.project.name }}</h2>
      <p>{{ community.project.description }}</p>
      <h2>{{ community.name }}</h2>
      <p>{{ community.description }}</p>
      <img src="../assets/images/Map.jpg" class="imageMap">
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="12" class="detail">
      <img :src="community.image" class="image">
      <h2>{{ community.project.name }}</h2>
      <p>{{ community.project.description }}</p>
      <h2>{{ community.name }}</h2>
      <p>{{ community.description }}</p>
      <img src="../assets/images/Map.jpg" class="imageMap">
    </el-col>
    <el-col :span="12">
      <el-card :body-style="{ padding: '30px' }" class="box-card" shadow="always">
        <div class="clearfix" style="text-align-last: justify;">
          <span>Meta <h4>{{ community.project.goal }}€</h4></span>
          <hr>
          <span>Interes anual en moneda local <h4>{{ community.project.interest }}%</h4></span>
          <hr>
          <span>Faltan <h4>{{ (community.project.goal - community.project.contributed) }}€</h4></span>
          <el-progress :percentage="getPercentage(community.project.goal, community.project.contributed)" color="primary"></el-progress>
        </div>
        <div class="button">
          <el-button type="success" @click="showModal = true"><strong>CONTRIBUIR</strong></el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <eh-PopUp v-if="showModal" @close="showModal = false" :community="community.name" :investmentAmount="amount" :communityID="communityID">
  </eh-PopUp>
</eh-layout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'
import PopUp from '@/components/PopUp.vue'

export default {
  name: 'CommunityDetail',
  props: {
    communityID: {
      type: [String, Number],
      required: true
    },
    amount: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      community: null,
      showModal: false
    }
  },
  mounted() {
    axios
      .get(`/communities/${this.communityID}/`)
      .then(response => {
        this.community = response.data
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

    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: 'Selecciona tu método de contribución',
        message: h('p', null, [
          radio('p', null, 'Message can be '),
          h('disable', {
            style: 'color: teal'
          }, 'VNode')
        ]),
        showCancelButton: false,
        confirmButtonText: 'CONTRIBUIR',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
  },
  computed: {

  },
  components: {
    'eh-layout': BaseLayout,
    'eh-PopUp': PopUp
  }
}
</script>

<style lang="scss" scoped>
/*************general*************/
  /****class****/
.button {
    text-align: center;
    margin: 15% 0;
}

.clearfix:after,
.clearfix:before {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.detail {
    margin-bottom: 8%;
}

.image {
    width: 100%;
    display: flex;
    object-fit: cover;
    height: 400px;
}
.imageMap {
    width: 100%;
    display: flex;
    object-fit: cover;
    height: 200px;
}

  /****tags****/
h4 {
    display: contents;
}

/*************mobile*************/

.box-card-mobile {
  width: 100%;
  height: 250px;
}

/*************desktop*************/
.box-card {
  width: 90%;
  height: 300px;
  margin: 0 10%;
}
</style>
