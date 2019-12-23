<template>
  <div class="welcome-holder">
    <div v-if="isActive" class="welcome-form">
      <p>Для поиска товара использовать местоположение:</p>
      <button 
        class="btn btn-current"
        @click="onPlaceUser('current')">
        Текущее
      </button>
      <p>или</p>
      <button
        class="btn"
        @click="onPlaceUser('other')">
        Другое
      </button>
    </div>
    <transition name="fade">
      <div v-if="!isActive" class="welcome-form address-form">
        <button 
          class="back-step"
          @click="onBackStep">
          <md-icon>keyboard_backspace</md-icon>
        </button>
        <p>Введите адрес:</p>
        <form @submit.prevent="() => false">
          <div :class="['input-group', {'md-focused': queryAddress}]">
              <md-field>
                  <md-input
                    :class="[{'is-error': !isValid}]"
                    placeholder="проспект Петра Григоренка, 2а, Харків"
                    v-model="queryAddress"/>
                  <button
                      v-show="visibleClear" 
                      class="icon-close"
                      @click="clear">
                      <md-icon>close</md-icon>
                  </button>
                  <md-button
                      type="submit"
                      class="md-raised" 
                      @click="search">
                      <md-icon>navigate_next</md-icon>
                  </md-button>
              </md-field>
              <p v-if="!isValid" class="error-tip">{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </transition>  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class WelcomeQuiz extends Vue {
  private queryAddress: string = '';
  private visibleClear: boolean = false;
  private isActive: boolean = true;
  private isValid: boolean = true;
  private errorMessage: string = 'Уточните пожалуйста адрес';

  private location: string = '';
  private geocoderApi: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private geocoderApiKey: string = '&key=AIzaSyDybVMhuvhySYB54emzIuWjt1S44P-Z_hg';

  @Watch('queryAddress')
  private changeQueryAddress(): void {
    if ( this.queryAddress !== '' ) {
      this.isValid = true;
    }
  }

  private onPlaceUser(option: string): void {
    if ( option === 'current' ) {
      this.$router.push({ path: 'search_product' });
    } else if ( option === 'other' ) {
      this.isActive = false;
    }
  }

  private clear(): void {
    console.log('clear');
  }

  private search(): void {
    if ( this.queryAddress !== '' ) {
      this.definedCoordinates();
    } else {
      this.isValid = false;
    }
  }

  private definedCoordinates() {
    this.$http
        .get(`${this.geocoderApi}${this.queryAddress}${this.geocoderApiKey}`)
        .then((response: any) => {
            if ( response.data.status === 'OK' ) {
              const location = response.data.results[0].geometry.location;
              this.$store.commit('setLocationSearchAddress', { item: { lat: location.lat, lng: location.lng} });
              localStorage.setItem('activeSearchAddress', JSON.stringify({address: this.queryAddress}));
              this.$router.push({name: 'search_product'});
            } else if ( response.data.status === 'ZERO_RESULTS' ) {
              this.isValid = false;
            }
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

  private onBackStep() {
    this.isActive = true;
    this.queryAddress = '';
  }

}

</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transition: opacity .1s;
  opacity: 0;
}
.welcome-form {
  box-shadow: 2px 2px 0px 1px rgba(0,0,0,.4);
  background: #333;
  width: 60%;
  min-width: 300px;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  &.address-form {
    button[type=submit] {
      min-width: 50px;
      min-height: 40px;
      margin: 5px 0;
    }
    input {
      height: 50px;
      &::placeholder {
        color: #000;
      }
      &::-webkit-input-placeholder {
        color: #000;
      }
    }
  }
  .back-step {
    background: transparent;
    outline: none;
    border-color: transparent;
    padding: 0;
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
    user-select: auto;
    z-index: 3;
  }
  .btn {
    font-size: 14px;
    border: 1px solid #fff;
    color: #fff;
    margin: 0 0 10px;
    padding: 7px 10px;
    width: 100%;
    &.btn-current {
      border-color: transparent;
      background-color: #ff5252;
    }
  }
  button[type=submit] {
    background-color: #424242;
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>