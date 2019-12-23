<template>
    <header id="header">
        <md-toolbar class="md-transparent">
            <router-link to="/"><strong class="md-title">GeoProduct</strong></router-link>
            <div class="md-toolbar-section-end">
                <div class="location-holder">
                    <span>Ваше местоположение:</span>
                    <p>{{ location }}</p>
                </div>
            </div>
        </md-toolbar>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';

@Component
export default class AppHeader extends Vue {
    private location: string = '';
    private geocoderApi: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    private geocoderApiKey: string = '&key=AIzaSyDybVMhuvhySYB54emzIuWjt1S44P-Z_hg';

    public locationUser(): void {
        const $self = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    $self.definedAddress({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                // tslint:disable-next-line:no-shadowed-variable
                function error(error) {
                    console.log(error);
                },
                {enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000},
               );
        } else {
            console.log('geolocation not supported');
        }
    }

    private mounted(): void {
        this.locationUser();
    }

    private definedAddress(Coordinates: any): void {
        const latlng = `${Coordinates.lat},${Coordinates.lng}`;
        this.$http
            .get(`${this.geocoderApi}${latlng}${this.geocoderApiKey}`)
            .then((response: any) => {
                if ( response.data.status === 'OK' ) {
                    const location = response.data.results[0].formatted_address.split(',').slice(0, -3);
                    this.location = location.join(',');
                    this.$store.commit('setLocation', { item: { lat: Coordinates.lat, lng: Coordinates.lng} });
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }



}

</script>

<style lang="scss">
#header {
    .md-toolbar {
        justify-content: center;
    }
    .location-holder {
        text-align: left;
        span {
            font-size: 11px;
        }
        p {
            margin: 0;
            font-size: 12px;
            text-decoration: underline;
        }
    }
}
</style>