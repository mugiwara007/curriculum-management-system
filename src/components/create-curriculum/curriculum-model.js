var _curriculumId="1";
var _yearLevel = 'first_year'
var _version ='0';

export const setCurriculumID = (id) =>{
    _curriculumId = id
}
export const getCurriculumID = () =>{
    return _curriculumId
}

export const setYearLevel = (yearLevel) =>{
    _yearLevel = yearLevel
}
export const getYearLevel = () =>{
    return _yearLevel
}

export const setVersion = (version) =>{
    _version = version
}
export const getVersion = () =>{
    return _version
}
