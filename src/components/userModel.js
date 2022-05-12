var _userLevel  = "2";
var _archiveList;
var _archiveVal;
var _archiveDisable = true;
export const setUserLevel = (userLevel) =>{
    _userLevel = userLevel
}
export const getUserLevel = () =>{
    return _userLevel
}

export const setArchivelist = (archiveList) =>{
    _archiveList = archiveList
}
export const getArchivelist = () =>{
    return _archiveList
}

export const setArchiveVal = (archiveVal) =>{
    _archiveVal = archiveVal
}
export const getArchiveVal = () =>{
    return _archiveVal
}

export const setArchiveDisable = (archiveDisable) =>{
    _archiveDisable = archiveDisable
}
export const getArchiveDisable = () =>{
    return _archiveDisable
}