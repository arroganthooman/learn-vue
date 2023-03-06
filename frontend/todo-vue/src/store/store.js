import Vuex from 'vuex'

export const store = new Vuex.Store({
    state: {
        todos:[{todoMessage: "test123", id:"1"}],
        dones:[]
    }
})