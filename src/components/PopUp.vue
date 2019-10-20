<template lang="html">
  <transition name="PopUp">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close">
            <i class="el-icon-close" @click="$emit('close')"></i>
          </div>
          <!-- PopUb_A -->
          <div v-if="process == 0">
            <h4>Selecciona tu método de contribución</h4>
            <tr>
              <td><el-radio v-model="radio" label="0" class="select">Ether</el-radio></td>
              <td><img src="../assets/images/ether_coin.jpeg" alt="Ether" class="coin"></td>
            </tr>
            <tr>
              <td><el-radio v-model="radio" label="1" class="select">Tarjeta</el-radio></td>
              <td><img src="../assets/images/credit_card.jpeg" alt="Tarjeta" class="card"></td>
            </tr>
            <div class="button">
              <!-- <el-button type="success" @click="$emit('close')">CONTRIBUIR</el-button> -->
              <el-button type="success" @click="nextStep()"><strong>CONTRIBUIR</strong></el-button>
            </div>
          </div>
          <!-- PopUb_B -->
          <div v-if="process == 1">
            <h4>Antes de procesar tu pago <br>confirma la cantidad que deseas invertir</h4>
            <tr>
              <td><p>CANTIDAD A INVERTIR</p></td>
              <td><p>{{`€ ${investmentAmount}`}}</p></td>
            </tr>
            <tr>
              <td><p>METODO SELECCIONADO</p></td>
              <td v-if="radio == '0'"><img src="../assets/images/ether_coin.jpeg" alt="Ether" class="coin"></td>
              <td v-if="radio == '1'"><img src="../assets/images/credit_card.jpeg" alt="Tarjeta" class="card"></td>
            </tr>
            <div class="button">
              <el-button type="white" @click="previousStep()"><strong>MODIFICAR</strong></el-button>
              <el-button type="success" @click="invest()"><strong>OK</strong></el-button>
            </div>
          </div>
          <!-- PopUb_C -->
          <div v-if="process == 2">
            <img src="../assets/images/Pop_Up_illustration.svg" alt="">
            <p><strong>¡ENHORABUENA!</strong></p>
            <p>Tu inversión en la comunidad de {{community}} <br> ya ha sido registrada </p>
              <el-button id="buttonClose" type="white">
                <router-link to='/'><strong>INVERTIR EN OTRAS COMUNIDADES</strong></router-link>
              </el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopUp',
  data() {
    return {
      radio: '0',
      process: 0
    }
  },
  mounted() {

  },
  props: {
    community: String,
    communityID: String,
    investmentAmount: String
  },
  methods: {
    nextStep: function() {
      this.process++;
    },
    previousStep: function() {
      this.process--;
    },
    invest: function() {
      var js = this;
      axios
        .post(`/communities/${this.communityID}/contribute/`, {
          amount: this.investmentAmount
        })
        .then(function(response) {
          console.log(response.data);
          js.nextStep();
        })
        .catch(function(error) {
          console.log(error);
          js.nextStep();
        });
        // vm.$forceUpdate();
    }
  },
  components: {}
}
</script>

<style lang="css" scoped>

  /****class***/
.card{
  width: 18%;
  margin: -4%;
}

.close{
  text-align: right;
}

.coin{
  width: 15%;
  margin: -4%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  text-align: center;
  width: 45%;
  height: fit-content;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.select{
  margin: 3% 0;
}

/****id****/
#buttonClose{
  margin-top: 0;
  white-space: normal;
}

/****tags***/
button{
  margin-top: 10%;
}

td{
  width: 50%;
}

p{
  font-size: small;
}

</style>
