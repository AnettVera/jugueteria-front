export const authManager = (state = {}, action) => {
    switch (action.type) {
        case 'SIGNIN':
            const token = localStorage.getItem('jwt_token');
            const roles = token ? action.payload.roles : [{ type: 'CLIENT' }];
            return {
                ...action.payload,
                roles,
                signed: true
            };
        case 'SIGNOUT':
            return {
                signed: false,
            };
        default:
            return state;
    }
};