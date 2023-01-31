const UserContact = (httpClient) => ({
    submit(payload) {
        return httpClient.post(`user/mails/create`, payload)
    },
})

export default UserContact