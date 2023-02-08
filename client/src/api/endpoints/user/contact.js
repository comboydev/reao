const UserContact = (httpClient) => ({
    submit(payload) {
        return httpClient.post(`user/mails/store`, payload)
    },
})

export default UserContact