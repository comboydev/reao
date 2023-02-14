const UserAuth = (httpClient) => ({
    signUp(payload) {
        return httpClient.post(`user/auth/signUp`, payload);
    },
    login(payload) {
        return httpClient.post(`user/auth/signIn`, payload)
    },
    sendLinkOfResetPassword(email) {
        return httpClient.post(`user/auth/sendLinkOfResetPassword`, { email })
    },
    resetPassword(token, password) {
        return httpClient.post(`user/auth/resetPassword/${token}`, { password });
    },
    checkLinkOfResetPassword(token) {
        return httpClient.fetch(`user/auth/checkLinkOfResetPassword/${token}`);
    },
    changePassword(email, password, newPassword) {
        return httpClient.post(`user/auth/changePassword`, {
            email,
            password,
            newPassword
        })
    },
    sendLinkOfVerifyEmail(current_email, new_email) {
        return httpClient.post(`user/auth/sendLinkOfVerifyEmail`, {
            current_email, new_email
        });
    },
    verifyEmail(token) {
        return httpClient.post(`user/auth/verifyEmail/${token}`);
    },
})

export default UserAuth