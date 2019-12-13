<template>
    <div class="search-holder">
        <form v-on:submit.prevent="search">
            <div :class="['input-group', {'md-focused': query}]">
                <md-field 
                    class="input-group-field">
                    <label>Пожалуйста, введите название товара ...</label>
                    <md-input v-model="query"></md-input>
                    <md-button 
                        class="md-raised" 
                        @click="search">
                        <md-icon>search</md-icon>
                    </md-button>
                </md-field>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';
import { mapState } from 'vuex';

@Component
export default class Search extends Vue {
    private query: string = '';

    public search(): void {
        this.$emit('searchProduct', this.query);
    }

}

</script>

<style lang="scss">
    .search-holder {
        .md-field {
            align-items: center;
            &:not(.md-focused) {
                label {
                    top: 30px;
                }
            }
        }
        .input-group {
            &.md-focused {
                label {
                    top: 0;
                    color: #448aff;
                    font-size: 12px;
                }
            }
        }
        .md-input {
            text-align: center;
        }
    }
</style>