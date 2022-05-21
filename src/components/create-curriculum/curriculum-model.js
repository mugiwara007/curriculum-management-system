var _curriculumId;
var _yearLevel = 'first_year'
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
