import axios from "axios";
import Vue from "vue";
const vue = new Vue();

export default {
  get: (path, params) => {
    console.log("axios get params", params);
    return new Promise(resolve => {
      axios
        .get(path, { params: params })
        .then(res => {
          if (res.status !== 200) {
            vue.$Message.error(res.statusText);
            return;
          }
          if (res.data.code === 0 || (res.data.code && res.data.code !== 200)) {
            vue.$Message.error(res.data.resMsg);
            return;
          }
          resolve(res);
        })
        .catch(error => {
          vue.$Message.error(error.message);
        });
    });
  },
  post: (path, params) => {
    return new Promise(resolve => {
      axios
        .post(path, params)
        .then(res => {
          if (res.status !== 200) {
            vue.$Message.error(res.statusText);
            return;
          }
          if (res.data.code === 0 || (res.data.code && res.data.code !== 200)) {
            vue.$Message.error(res.data.resMsg);
            return;
          }
          resolve(res);
        })
        .catch(error => {
          vue.$Message.error(error);
        });
    });
  }
};
