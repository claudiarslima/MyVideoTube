// -------------------------- PÁGINA QUE PROCESSA VERIFICAÇÕES A NÍVEL DAS VIEWS POR CATEGORIA -------------------------------------------------//

//adiciona as views ao firebase
export const Views = (view) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        firestore.collection('views').add({
            nrviews: view.nrviews,
            categoria: view.categoria,
            userId: userId,
            // createdAt: new Date(),
            // like: true
        }).then(() => {
            dispatch({type: 'ADD_VIEW', nrviews: view})
        }).catch(err => {
            console.log('error', err);
            dispatch({type: 'ERRO_VIEW', err})
        })
    }
};
