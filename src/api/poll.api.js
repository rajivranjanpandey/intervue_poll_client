import apiService from "../utils/apiService";

export function getActivePollApi(payload) {
    return apiService({
        url: '/poll',
        method: 'GET',
        body: payload
    })
}
export function createPollApi(payload) {
    return apiService({
        url: '/poll',
        method: 'POST',
        body: payload
    })
}
export function getLivePollApi(payload) {
    return apiService({
        url: '/live-poll',
        method: 'GET',
        body: payload
    })
}
export function getLivePollHistoryApi(payload) {
    return apiService({
        url: '/poll-history',
        method: 'GET',
        body: payload
    })
}
export function submitPollAnswerApi(payload) {
    return apiService({
        url: '/poll-answer',
        method: 'POST',
        body: payload
    })
}