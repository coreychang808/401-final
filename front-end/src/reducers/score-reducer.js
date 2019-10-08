export default (state = [], {type, payload}) => {
  switch(type){
    case 'SCORE_LOAD':
      payload = payload.sort((a,b) => {
        let first = a.score;
        let second = b.score;
        if(first > second) {
            return -1;
        }
        if(second > first){
            return 1;
        }
        return 0;
        });
        payload[0].name = `(TOP SCORE!) ${payload[0].name}`;
      return payload;
    case 'SCORE_ADD':
      return [...state, payload];
    case 'SCORE_UPDATE':
      state = state.map(score=>{
        if( score.id === payload.id ){
          return payload;  
        }
        return score;
      });
      return state;
    case 'SCORE_DELETE':
      state = state.filter(score => score.id !== payload);
      return state;
    default:
      return state;
  }
};