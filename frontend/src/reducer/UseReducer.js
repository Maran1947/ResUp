export const initialState = {
    status: false,
    user: null
};

export const reducer = (state, action) => {
    if(action.type === "USER") {
        return action.payload;
    } 

    return state;
}