const authReducer = (state={data:null},action)=>{
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('Profile',JSON.stringify({...action?.data}))  // the ? is for if the data exist it store the date or leave it
              // as we are going to get the data from backend in json we have to convert it into string so json.stringify
            return {...state,data:action?.data}

        case 'LOGOUT':
            localStorage.clear();
            return {...state,data:null}
    
        default:
            return state;
    }

}

export default authReducer