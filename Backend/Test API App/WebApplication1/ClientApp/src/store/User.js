const initialState = {
    users: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestUsers: () => async (dispatch, getState) => {

        const url = 'api/User/Users';
        const response = await fetch(url);
        const users = await response.json();
        dispatch({ type: 'FETCH_USERS', users });
    },
    saveUser: user => async (dispatch, getState) => {

        const url = 'api/User/SaveUser';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(user)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_USER', user });
    },
    deleteUser: Id => async (dispatch, getState) => {
        const url = 'api/User/DeleteUser/' + Id;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_USER', Id });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_USERS': {
            return {
                ...state,
                users: action.users,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_USER': {
            return {
                ...state,
                users: Object.assign({}, action.user),
                forceReload: true
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                Id: action.Id,
                forceReload: true
            }
        }
        default:
            return state;
    }
};