import { createStore } from 'redux';

// npm install --save redux
// ref: 
// https://juejin.im/post/5b755537e51d45661d27cdc3
// https://ithelp.ithome.com.tw/articles/10187498
// http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
// https://segmentfault.com/a/1190000015067170
// https://redux.js.org/api/combinereducers

function updateToken(state = "", action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return action.text
    default:
      return state
  }
}

const store = createStore(updateToken)

export default store;

// import store from "../store/Store";

// pub
// store.dispatch({ type: 'UPDATE_TOKEN', text: obj.token })

// sub
// componentDidMount(){
//   // componentWillMount(){
//       let currentComponent = this;
//       function handleChange() {
//           currentComponent.setState({
//               token: store.getState(),
//               inputText:'',
//               itemList:[] 
//           })
//           if(store.getState() === "" || store.getState().trim() === ""){
//               return
//           }
//           console.log('start query'+ store.getState());
//       }
//       store.subscribe(handleChange)
//   }
