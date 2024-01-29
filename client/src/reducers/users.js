const usersReducer =(states=[],action)=>{
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload; // the action.payload value will be asigned to states in the form of array as we have given in the userReducer states=[]
        case 'UPDATE_CURRENT_USER':
            return states.map((state)=> state._id === action.payload._id ? action.payload:state)   // we are getting only require data i.e we are checking the id and returning required id data
        default:
            return states
    }
}
export default usersReducer