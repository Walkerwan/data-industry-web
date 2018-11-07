import _ from 'lodash'
export default {
    state: {
        quickCreateDimesionId: '',
        quickCreateTagDaTa: [],
        quickCreateState: 1
  },
    mutations: {
        setQuickCreateDimesionId(state, currentDimesion) {
            state.quickCreateDimesionId = currentDimesion;
        },
        setQuickCreateTagDaTa(state, currentQuickCreateTagDaTa) {
            const copyArray = _.cloneDeep(currentQuickCreateTagDaTa)
            copyArray.map(item => {
                item.relevanceBasicsLabelname = [item.relevanceBasicsLabelname];
                return item;
            })
            state.quickCreateTagDaTa = copyArray;
        },
        setQuickCreateState(state, currentQuickCreateState) {
            state.quickCreateState = currentQuickCreateState
        }
  },
  getters: {
  }
};
