import apiService from "../utils/apiService";

export function getStudentsApi(payload) {
    return apiService({
        url: '/students',
        method: 'GET',
        body: payload
    })
}
export function removeStudentApi(payload) {
    return apiService({
        url: `/kickout/${payload.studentId}`,
        method: 'DELETE',
        body: payload
    })
}