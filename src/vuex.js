// example store
// let store = new Vuex.Store({
//     state: {
//         count: 0
//     },
//     actions: {
//         countPlusSix(context, payload) {
//             context.commit('plusSix');
//         }
//     },
//     mutations: {
//         incrementFive(state, payload) {
//             state.count = state.count + 5;
//         },
//     },
//     getters: {
//         getStatePlusOne(state) {
//             return state.count + 1
//         }
//     }
//   });

let Vue = null
const forEach = (obj, callback) => Object.keys(obj).forEach(key => callback(key, obj[key]))

class Store {
    constructor(options) {
        const { state = {}, getters = {}, mutations = {}, actions = {} } = options
        this._vm = new Vue({
            data: () => ({state})
        })

        this.getters = Object.create(null)
        this.mutations = Object.create(null)
        this.actions = Object.create(null)

        forEach(getters, (name, func) => {
            // getter只有get访问
            Object.defineProperty(this.getters, name, {
                get: () => func(this.state)
            })
        })

        forEach(mutations, (name, func) => {
            // mutaion可以带上额外参数payload
            this.mutations[name] = payload => func(this.state, payload)
        })

        forEach(actions, (name, func) => {
            // actions带上（commit/dispatch/store）参数，即this
            this.actions[name] = payload => func(this, payload)
        })
    }

    get state() {
        return this._vm.state
    }

    // 箭头函数确定this指向当前$store
    // 如果这俩方法定义在原型链上，解构时方法里的this指向window，报错
    commit = (type, payload) => {
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
}

const install = _Vue => {
    Vue = _Vue

    // 每个组件都绑定上全局唯一$store,方便管理
    Vue.mixin({
        // 组件开始渲染时，是先执行父组件beforeCreate，再执行子组件beforeCreate。深度优先
        // 而cretead事件，是先子组件执行完created，再是父组件created
        // 所以此时选用beforeCreate事件
        beforeCreate () {
            if (this.$options && this.$options.store) {
                // 根组件
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })

}

export default {
    Store,
    install
}