export const authManager = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                user: {
                    roles: action.payload.roles,
                    signed: true,
                },
            };
        case 'SIGNOUT':
            return {
                ...state,
                user: {
                    roles: [],
                    signed: false,
                },
            };
        default:
            return state;
    }
};
