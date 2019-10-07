export default (state = [], {type, payload}) => {
    switch(type) {
      case 'SCORE_LOAD':
        return payload;
      case 'SCORE_UPDATE':
        return state.map(item => {
          console.log(item);
          if(item.id === payload.id){
            return payload;
          }
          return item;
        })
      default:
        return state;
    }
  };