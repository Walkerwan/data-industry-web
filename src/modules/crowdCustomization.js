import _ from "lodash";
import axios from "../utils/axios";
import tagTreeData from "../data/tagTreeData.json";
import crowdTreeData from "../data/crowdTreeData.json";
import {PEOPLERULE_API, CROWDCOMBINATION_API, EDITECROWDRULE_API, RELATIONTYPE} from '../constants'

function transferTreeData(source = []) {
  return source.map(item => {
    item.peopleRules && (item.children = item.peopleRules);
    for (let child of item.children) {
      child.indLabelName = child.peopleName;
      child.indLabelId = child.peopleId;
      child.peoScaleNum = child.peoNewestScalenum;
    }
    item.indLabelGroupName = item.title;
    //hierarchy>=3,可以被选中
    item.hierarchy = 3;
    return {
      ...item
    }
  })
}

function setAllExpanded(treeData) {
  for (let treeItem of treeData) {
    const children = treeItem.children;
    if (children && children.length > 0) {
      treeItem.expanded = true;
      setAllExpanded(children);
    }
  }
}

function setAllUnchecked(treeData) {
  for (let treeItem of treeData) {
    treeItem.checked = false;
    if (treeItem.children) {
      setAllUnchecked(treeItem.children);
    }
  }
}

/*idPath:1/2/4*/
function clearItemCheck(treeData, parentId, id) {
  for (let item of treeData) {
    if (item.children && item.indLabelGroupId && item.indLabelGroupId != parentId) {
      clearItemCheck(item.children, parentId, id)
    } else {
      if (item.indLabelGroupId == parentId) {

        item.children.find(child => child.indLabelId == id) && (item.children.find(child => child.indLabelId == id).checked = false)
      }
    }

  }
}

function setItemCheck(treeData, parentId = '-1', id) {
  for (let item of treeData) {
    if (!item.children && item.indLabelId && item.indLabelId == id) {
      item.checked = true;
      return;
    }
    if (item.children) {
      setItemCheck(item.children, parentId, id)
    }
  }
}

function setChildNodeState(children, state) {
  for (let item of children) {
    item.disabeled = state;
    if (item.children) {
      setChildNodeState(item.children, state)
    }
  }
}

function transToName(type) {
  for (let key  in RELATIONTYPE) {
    if (RELATIONTYPE[key] == type) {
      return key
    }
  }
}

function setTableData(data) {
  if (data.peopleRules[0].industryLabels) {
    return [...data.peopleRules].map(item => ({
      ...item,
      selectedTags: item.industryLabels,
      insideRelationType: transToName(item.insideRelationType),
      outsideRelationType: transToName(item.outsideRelationType)
    }))
  } else {
    return [
      ...data.peopleRules].map(item => ({
      ...item, selectedTags: item.peopleRules.map(item => ({
        ...item, indLabelName: item.peopleName, indLabelId: item.peopleId,
        peoScaleNum: item.peoNewestScalenum
      })), insideRelationType: transToName(item.insideRelationType),
      outsideRelationType: transToName(item.outsideRelationType)
    }))
  }

}

function setLastNodeIndexs(item, index) {
  const treeItem = item;
  treeItem.checked = false;
  const checkChangedItems = [];
  const childIndexArr = [index];
  if (!treeItem.children) {
    treeItem.indexArr = childIndexArr;
    checkChangedItems.push(treeItem);
  }
  setChildrenChecked(
    treeItem,
    treeItem.checked,
    childIndexArr,
    checkChangedItems
  );
}

function setChildrenChecked(
  treeItem,
  checked,
  indexArr,
  checkChangedItems
) {
  const children = treeItem.children;
  if (!children) {
    return;
  }
  for (let index in children) {
    const child = children[index];
    child.checked = checked;
    let indexs = [...indexArr, index]
    if (!child.children) {
      child.indexArr = indexs;
      checkChangedItems.push(child);
    }
    setChildrenChecked(
      child,
      checked,
      indexs,
      checkChangedItems
    );
  }
}

function matchKeyWords(treeData, keyWord) {
  for (let treeItem of treeData) {
    treeItem.disabeled = true;
    if (treeItem.indLabelGroupName) {
      if (treeItem.indLabelGroupName.indexOf(keyWord) > -1) {
        treeItem.disabeled = false;
        setChildNodeState(treeItem.children, false)
      } else {
        if (findKeywordInChildNode(treeItem, keyWord)) {
          treeItem.disabeled = false;
          if (treeItem.children) {
            matchKeyWords(treeItem.children, keyWord)
          }
        }
        else {
          treeItem.disabeled = true;
          setChildNodeState(treeItem.children, true)
        }

      }
    } else {
      if (treeItem.indLabelName) {
        if (treeItem.indLabelName.indexOf(keyWord) > -1) {
          treeItem.disabeled = false;
        }
      }
    }

  }
}

function findKeywordInChildNode(item, keyword) {
  const children = item.children;
  if (item.indLabelName && (item.indLabelName.indexOf(keyword) > -1)) {
    return true;
  }
  if (children) {
    for (let child of children) {
      if (
        (child.indLabelGroupName &&
          child.indLabelGroupName.indexOf(keyword) > -1) ||
        findKeywordInChildNode(child, keyword)
      ) {
        return true;
      }
    }
  }
  return false;
}

/*给每一项数据设置属性:disabeled,true:隐藏,false:显示*/
function setSearchData(treeData, keyWord) {
  treeData.forEach((treeItem) => {
    treeItem.disabeled = true;
    if (treeItem.indLabelGroupName) {
      if (treeItem.indLabelGroupName.indexOf(keyWord) > -1) {
        treeItem.disabeled = false;
        setChildNodeState(treeItem.children);
      } else {
        if (findKeywordInChildNode(treeItem, keyWord)) {
          treeItem.disabeled = false;
        }
        if (treeItem.children) {
          matchKeyWords(treeItem.children, keyWord)
        }
      }
    }
  });
  return treeData;
}

export default {
  namespaced: true,
  state: {
    currentCrowd: {
      groupName: "A",
      outsideRelationType: "union",
      insideRelationType: "union",
      selectedTags: []
    },
    crowds: [
      {
        groupName: "A",
        outsideRelationType: "union",
        insideRelationType: "union",
        selectedTags: []
      }
    ],
    treeData: [],
    analysisType: "customization",
    industries: [],
    currentIndustry: {},
    sourceData: [],
    editeSourceData: {},
    historyEditeName: ''
  },
  getters: {
    getAnalysisType: state => {
      return state.analysisType;
    },
    getCrowds: state => {
      return state.crowds;
    },
    getCurrentCrowd: state => {
      return state.currentCrowd;
    },
    getCurrentIndustry: state => {
      return state.currentIndustry
    },
    getTreeData: state => {
      return state.treeData;
    },
    getIndustryData: state => {
      return state.industries;
    },
    getEditeSourceData: state => {
      return state.editeSourceData;
    },
    getPeopleId: state => state.editeSourceData.peopleId,
    getHistoryPeopleName: state => state.historyEditeName,
  },
  mutations: {
    setSourceData(state, data) {
      state.sourceData = data;
    },
    setIndustriesData(state, data) {
      state.industries = _.cloneDeep(data)
    },
    setCurrentIndustry(state, data) {
      state.currentIndustry = state.industries.find(item => item.indCode === data) || {}
    },
    setAnalysisType(state, analysisType) {
      state.analysisType = analysisType;
    }
    ,
    resetTreeData(state) {
      state.treeData = _.cloneDeep(state.treeData);
    }
    ,
    setTreeDataChecked(state) {
      const crowds = state.crowds;
      for (let crowd of crowds) {
        const selectedTags = crowd.selectedTags;
        for (let tag of selectedTags) {
          let arrPath = "";
          const indexArr = _.cloneDeep(tag.indexArr);
          if (indexArr.length > 0) {
            arrPath += "[" + indexArr.shift() + "]";
          }
          for (let index in indexArr) {
            arrPath += ".children[" + indexArr[index] + "]";
          }
          eval("state.treeData" + arrPath + "=tag");
        }
      }
    }
    ,
    clearCustomization(state) {
      const emptyCrowd = {
        groupName: "A",
        outsideRelationType: "union",
        insideRelationType: "union",
        selectedTags: []
      };
      state.crowds = [emptyCrowd];
      state.currentCrowd = emptyCrowd;
      state.treeData = _.cloneDeep(state.sourceData);
    }
    ,
    checkChanged(state, checkChangedItems) {
      const newSelectedTags = _.cloneDeep(state.currentCrowd.selectedTags);
      //过滤disabeled=true(查询时,没有显示的项)的项
      for (let checkChangedItem of checkChangedItems.filter(item => !item.disabeled)) {
        const matchedIndex = newSelectedTags.findIndex(item => item.indLabelId === checkChangedItem.indLabelId);
        if (matchedIndex === -1 && checkChangedItem.checked) {
          newSelectedTags.push(checkChangedItem);
          continue;
        }
        if (!checkChangedItem.checked) {
          newSelectedTags.splice(matchedIndex, 1);
        }
      }
      state.currentCrowd.selectedTags = newSelectedTags;
    }
    ,
    setNewSelectedTags(state, newSelectedTags) {
      state.currentCrowd.selectedTags = newSelectedTags;
    }
    ,
    changeCombinationMethodInGroup(state, insideRelationType) {
      state.currentCrowd.insideRelationType = insideRelationType;
      for (let crowd of state.crowds) {
        if (crowd.groupName === state.currentCrowd.groupName) {
          crowd.insideRelationType = insideRelationType;
        }
      }
    }
    ,
    changeCombinationMethodToPeer(state, index) {
      const stateCrowd = state.crowds[index];
      switch (stateCrowd.outsideRelationType) {
        case "union":
          stateCrowd.outsideRelationType = "intersaction";
          break;
        case "intersaction":
          stateCrowd.outsideRelationType = "difference";
          break;
        case "difference":
          stateCrowd.outsideRelationType = "union";
          break;
      }
    }
    ,
    deleteTag(state, index) {
      //利用浅复制的特性,改变currentCrowd,连带改变crowds
      const selectedTag = state.currentCrowd.selectedTags[index];
      selectedTag.check = false;
      state.currentCrowd.selectedTags.splice(index, 1);
      //清除左侧菜单的勾选项
      clearItemCheck(state.treeData, selectedTag.indInvolvedGroupid, selectedTag.indLabelId);
      state.treeData = _.cloneDeep(state.treeData);
    }
    ,
    deleteCrowd(state, delectCrowd) {
      //清除checked
      setAllUnchecked(state.treeData);
      const index = state.crowds.findIndex(item => item.groupName === delectCrowd.groupName);
      if (index > -1) {
        state.crowds.splice(index, 1);
        if (state.currentCrowd.groupName === delectCrowd.groupName) {
          state.currentCrowd = state.crowds[0];
          for (let item of  state.currentCrowd.selectedTags) {
            setItemCheck(state.treeData, item.indInvolvedGroupid, item.indLabelId)
          }
        }
      }
      state.treeData = _.cloneDeep(state.treeData);
    }
    ,
    addCrowd(state, groupName) {
      setAllUnchecked(state.treeData);
      state.crowds.push({
        groupName: groupName,
        outsideRelationType: "union",
        insideRelationType: "union",
        selectedTags: []
      });
      //不需要深复制,浅复制保持当前数据和源数据的一致性
      state.currentCrowd = state.crowds[state.crowds.length - 1];
    }
    ,
    setCrowds(state, crowds) {
      state.crowds = crowds;
    }
    ,
    setCurrentCrowd(state, groupName) {
      //清除checked
      setAllUnchecked(state.treeData);
      //不需要深复制,浅复制保持当前数据和源数据的一致性
      state.currentCrowd = groupName ? state.crowds.find(item => item.groupName === groupName) : state.crowds[0];
      for (let item of  state.currentCrowd.selectedTags) {
        setItemCheck(state.treeData, item.indInvolvedGroupid, item.indLabelId)
      }
      state.treeData = _.cloneDeep(state.treeData);

    },
    setTreeDataCheckedByCurrentCrowd(state) {
      for (let item of  state.currentCrowd.selectedTags) {
        setItemCheck(state.treeData, item.indInvolvedGroupid, item.indLabelId)
      }
      state.treeData = _.cloneDeep(state.treeData);
    },
    setTreeData(state, treeData) {
      state.treeData = treeData;
    },
    setTreeDataAllUnchecked(state) {
      setAllUnchecked(state.treeData);
      state.treeData = _.cloneDeep(state.treeData);
    },
    saveEditeSourceData(sate, source) {
      sate.editeSourceData = source;
    },
    setLastNodeCheckData(sate) {
      sate.treeData.forEach((item, index) => {
        setLastNodeIndexs(item, index)
      })
      state.treeData = _.cloneDeep(state.treeData);
    },
    setHistoryPeopleName(sate, name) {
      sate.historyEditeName = name;
    }
  },
  actions: {
    getIndustriesData(context, params) {
      return new Promise((resolve, reject) => axios.get(PEOPLERULE_API.GET_INDUSTRIES).then(res => {
        context.commit('setIndustriesData', res.data)
        resolve(res.data)
      }))
    },
    getDataByIndustryId({commit, dispatch, state, rootGetters, rootState}, {payload, expandAll, checked}) {
      commit('setCurrentIndustry', payload.industryCode);
      if (rootGetters.getCurrentRoute.some(item => item === 'customization')) {
        dispatch({type: 'getIndustresGroupsByIndustryId', payload, expandAll, checked});
      } else {
        dispatch({type: 'getCrowdsCombinationsById', payload, expandAll, checked});
      }

    },
    createPeopleRule(context, {payload}) {
      return new Promise((resolve, reject) => axios.post(PEOPLERULE_API.CREATE, {...payload}).then(res => {
        resolve(res)
      }))
    },
    getIndustresGroupsByIndustryId({commit, state}, {payload, expandAll, checked}) {
      axios.get(PEOPLERULE_API.GET_INDUSTRIES_GROUPS, {...payload}).then(res => {
        res.data && commit('setTreeData', res.data)
        checked && commit('setTreeDataCheckedByCurrentCrowd');
        expandAll && setAllExpanded(state.treeData);
        res.data && commit('setSourceData', res.data)
      })
    },
    getCrowdsCombinationsById({commit, state}, {payload, expandAll, checked}) {
      axios.get(CROWDCOMBINATION_API.GET_PEOPLERULES, {...payload}).then(res => {
        res.data && commit('setTreeData', transferTreeData(res.data))
        expandAll && setAllExpanded(state.treeData);
        checked && commit('setTreeDataCheckedByCurrentCrowd');
        res.data && commit('setSourceData', res.data)
      })
    },
    async getCrowdsByPeopleId({commit, dispatch}, {payload}) {
      dispatch('getIndustriesData');
      return new Promise((resolve, reject) => axios.get(EDITECROWDRULE_API.GET_CROWDRULE, {...payload}).then(res => {
        commit('saveEditeSourceData', res.data);
        commit('setCrowds', setTableData(res.data));
        commit('setCurrentCrowd');
        commit('setHistoryPeopleName', res.data.peopleName || '');
        dispatch({
          type: 'getDataByIndustryId',
          payload: {industryCode: res.data.belongsIndcode},
          expandAll: true,
          checked: true
        });
        resolve({ruleValidType: res.data.ruleValidType, peopleName: res.data.peopleName})
      }))
    },
    updateCrowdRule(context, {payload}) {
      return new Promise(resolve => axios.post(EDITECROWDRULE_API.EDITE_CROWDRULE, {...payload}).then(res => {
        resolve(res)
      }))
    },
    matchKeyWordsForTreeData({commit, state}, {searchKeyWord}) {
      let treeData = _.cloneDeep(state.sourceData);
      searchKeyWord.length > 0 ? treeData = setSearchData(treeData, searchKeyWord) : '';
      setAllExpanded(treeData);
      commit('setTreeData', treeData);
    }
  }
};
