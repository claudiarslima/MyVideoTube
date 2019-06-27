
// -------------------------- PÁGINA QUE PROCESSA VERIFICAÇÕES A NÍVEL DOS LIKES NOS VÍDEOS -------------------------------------------------//

//adiciona os likes ao firebase
export const Likes = (like) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore.collection('likes').add({
      id: like.id,
      title: like.title,
      description: like.description,
      img: like.img,
      userId: userId,
      createdAt: new Date(),
      like: true,
      link: like.link
  }).then(() => {
    dispatch({type: 'ADD_LIKE', id:like})
  }).catch(err=>{
    console.log('error')
    dispatch({type: 'ERRO_LIKE'})
  })
  }
}

export const Delete = (like) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore.collection('likes').where("id", "==", like.id).where("userId", "==", like.userId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        firestore.collection('likes').doc(doc.id).delete();
      })
      dispatch({type: 'DELETE'})
    }).catch(err => {
      console.log('erro no delete')
      dispatch({type: 'ERRO_DELETE'})
    })
  }
}
