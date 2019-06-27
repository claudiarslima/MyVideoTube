const initState = {
  later: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const laterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LATER':
      console.log("ver mais tarde", action.later);
      return state;

    case 'ERRO_LATER':
    console.log("erro no ver mais tarde", action.err);
    return state;

    case 'DELETE':
    console.log("delete efetuado", action.delete);
    return state;

    case 'ERRO_DELETE':
    console.log("erro no delete", action.err);
    return state;

    default:
    return state;
  }
}

export default laterReducer;
