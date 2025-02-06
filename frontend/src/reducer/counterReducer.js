// counterReducer.js
const initialState = { username: "", _id: "" };

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERNAME':
            return { username: action.payload };
        default:
            return state;
    }
};

export default counterReducer;
