import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const state = {
    token: '',
    username: 'admin',
    userState: 0,
    menu_data: [],
    isLoadRoute: false,
    editTableTabsValue: '1',
    editTableTabs: [
        {
            title: '首页',
            name: '首页',
            content: '首页'
        }
    ],
    tabIndex: 1
}

const mutations = {
    setUser (state, name) {
        state.username = name;
    },
    setUserState(state, data) {
        state.userState += data;
    },
    setMenuData(state, data) {
        state.menu_data = data;
    },
    setLoadRoute(state, data) {
        state.isLoadRoute = data;
    },
    addEditTableTabs(state, tab) {
        let index = state.editTableTabs.findIndex(item => item.name === tab.name)
        if (index === -1) {
            state.editTableTabs.push({
                title: tab.name,
                name: tab.name
            })
        }

        state.editTableTabsValue = tab.name
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    resetState(state) {
        state.token = ''
        localStorage.clear()
    }
}

export default new Vuex.Store({
    state,
    mutations
})
