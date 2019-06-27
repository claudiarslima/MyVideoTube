//state inicial
const initState = {
    authError: null,
    email: null
}

//processamento de erros relacionados com a autenticação
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_REGISTADO':
            console.log('user registado');
            return {
                ...state,
                authError: null
            };
        case 'ERRO_REGISTO':
            console.log('erro no registo');
            return {
                ...state,
                authError: action.err.message
            };
        case 'LOGIN_EFETUADO':
            console.log('login efetuado');
            return {
                ...state,
                authError: null,
            };
        case 'SIGNOUT_SUCCESS':
            console.log('logout efetuado', );
            return state
        case 'ERRO_LOGIN':
            console.log('erro no login');
            return {
                ...state,
                authError: 'Erro no Login'
            };
        case 'ERRO_EMAIL':
            console.log('erro no email');
            return {
                ...state,
                authError: action.err.message,

            };
        case 'ERRO_PASSWORD':
            console.log('password errada');
            return {
                ...state,
                authError: action.err.message
            };
        case 'ERRO_UPDATEPASS':
            console.log('password não alterada');
            return {
                ...state,
                authError: action.err.message
            };
        case 'RESET_FEITO':
            console.log('reset feito');
            return {
                ...state,
                email: action.email_certo
            } ;
        case 'ERRO_RESET':
            return {
                ...state,
                authError: action.err.message
            };
        default:
            return state;

    }
};

export default authReducer;
