export function setSessionRole(role) {
    sessionStorage.setItem('role', role);
}
export function getSessionRole(role) {
    return sessionStorage.getItem('role');
}
export function setStudentNameSession(name) {
    sessionStorage.setItem('student_name', name);
}
export function getStudentNameSession() {
    return sessionStorage.getItem('student_name');
}
