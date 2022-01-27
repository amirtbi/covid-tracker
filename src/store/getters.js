
import axios from 'axios';
export default {
  summary(state) {
    return state.globalInfo;
  },
   countries(state){
    
    return state.countries;

  }
};
