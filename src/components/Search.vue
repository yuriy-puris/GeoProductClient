<template>
    <div class="search-holder">
        <form v-on:submit.prevent="search">
            <div :class="['input-group', {'md-focused': query}]">
                <md-field 
                    class="input-group-field">
                    <label>Пожалуйста, введите название товара ...</label>
                    <md-input v-model="query"></md-input>
                    <button
                        v-show="visibleClear" 
                        class="icon-close"
                        @click="clear">
                        <md-icon>close</md-icon>
                    </button>
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
import { Component, Watch, Emit, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';
import { mapState } from 'vuex';

@Component
export default class Search extends Vue {
    private query: string = '';
    private visibleClear: boolean = false;

    @Watch('query')
    public onQueryChanged() {
        this.visibleClear = (this.query.length > 0) ? true : false;
    }

    public search(): void {
        this.$emit('searchProduct', this.query);
    }

    public clear(): void {
        this.query = '';
    }

}

</script>

<style lang="scss">
    .search-holder {
        max-width: 70%;
        margin: 0 auto;
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
                    color: #fff;
                    top: 0;
                    opacity: .4;
                    font-size: 12px;
                }
            }
        }
        .icon-close {
            background: transparent;
            outline: none;
            border-color: transparent;
            padding: 0;
            cursor: pointer;
            i {
                font-size: 16px!important;
            }
        }
        .md-button {
            margin: 6px 0;
        }
    }
</style>