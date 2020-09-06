import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userIsLoggedIn: false,
        uid: null
    },
    getters: {
        userIsLoggedIn(state){
            return state.userIsLoggedIn;
        },
        uid(state){
            return state.uid;
        },       
    },
    mutations: {
        updateUserLoginStatus: (state, payload) => {
            state.userIsLoggedIn = payload;
        }
    },
    actions: {
        updateUserLoginStatus: (context, payload) => {
            context.commit('updateUserLoginStatus', payload);
        }
    }
})