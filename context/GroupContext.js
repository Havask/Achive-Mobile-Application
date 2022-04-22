import React, {useState, createContext} from "react"; 

const GroupContext = createContext([{}, () => {}]); 

const GroupProvider = (props) => {
    const [state, setState] = useState({
        groupname: "", 
        groupID: "", 
        color: "", 
        members: [], 
        GroupPhotoUrl: "default"
    })

    return <GroupContext.Provider value={[state, setState]}>{props.children}</GroupContext.Provider>
}

export {GroupContext, GroupProvider}
