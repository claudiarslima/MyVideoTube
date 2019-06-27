const initState = {
  likes: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const likeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      console.log("like adicionado", action.like);
      return state;

    case 'ERRO_LIKE':
    console.log("erro no like", action.err);
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

export default likeReducer;
