<template>
    <div class="search-holder">
        <form @submit.prevent="() => false">
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
                        type="submit"
                        class="md-raised" 
                        @click="search">
                        <md-icon>search</md-icon>
                    </md-button>
                </md-field>
                <p v-if="!isValid" class="error-tip">{{ errorMessage }}</p>
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
    private isValid: boolean = true;
    private errorMessage: string = 'Уточните пожалуйста адрес';

    @Watch('query')
    public onQueryChanged() {
        this.visibleClear = (this.query.length > 0) ? true : false;
        if ( this.query !== '' ) {
            this.isValid = true;
        }
    }

    public clear(): void {
        this.query = '';
        this.$emit('clearProduct');
    }

    private search(): void {
        if ( this.query !== '' ) {
            this.$emit('searchProduct', this.query);
        } else {
            this.isValid = false;
        }
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
            label {
                text-align: left;
                width: calc(100% - 88px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .input-group {
            position: relative;
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