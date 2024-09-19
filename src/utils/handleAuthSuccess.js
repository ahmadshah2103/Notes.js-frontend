export const handleAuthSuccess = (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.status = "succeeded";
    localStorage.setItem("authState", JSON.stringify(state));
};
