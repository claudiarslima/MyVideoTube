
// -------------------------- PÁGINA QUE PROCESSA VERIFICAÇÕES A NÍVEL DOS PLAYS NOS VÍDEOS -------------------------------------------------//

//adiciona o play ao firebase
export const Recomendados = (rec) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore.collection('recomendados').add({
      id: rec.id,
      title: rec.title,
      description: rec.description,
      img: rec.img,
      userId: userId,
      createdAt: new Date(),
      rec: true,
      link: rec.link
  }).then(() => {
    dispatch({type: 'ADD_REC', id:rec})
  }).catch(err=>{
    console.log('error')
    dispatch({type: 'ERRO_REC'})
  })


  }
}
