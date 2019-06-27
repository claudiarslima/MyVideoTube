
// -------------------------- PÁGINA QUE PROCESSA VERIFICAÇÕES A NÍVEL DO VER MAIS TARDE NOS VÍDEOS -------------------------------------------------//

//adiciona o vídeo ao ver mais tarde no firebase

export const Later = (later) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore.collection('later').add({
      id: later.id,
      title: later.title,
      description: later.description,
      img: later.img,
      userId: userId,
      createdAt: new Date(),
      later: true,
      duration: later.duration,
      link: later.link
  }).then(() => {
    dispatch({type: 'ADD_LATER', id:later})
  }).catch(err=>{
    console.log('error')
    dispatch({type: 'ERRO'})
  })
  }
}

export const Delete = (later) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore.collection('later').where("id", "==", later.id).where("userId", "==", later.userId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        firestore.collection('later').doc(doc.id).delete();
      })
      dispatch({type: 'DELETE_LATER'})
    }).catch(err => {
      console.log('erro no delete')
      dispatch({type: 'ERRO_DELETE'})
    })
  }
}
