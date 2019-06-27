const initState = {
  recs: [{
    id: ' ',
    title: ' ',
    description: ' '
  }]
}

const recomendadosReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_REC':
    console.log("recomendado adicionado", action.rec)
    return state;

    case 'ERRO_REC':
    console.log("recomendado não adicionado", action.err)
    return state;

    default:
    return state;
  }
}

export default recomendadosReducer;
