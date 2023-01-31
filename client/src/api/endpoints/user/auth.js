const UserAuth = (httpClient) => ({
    login(email, password) {
        return httpClient.post(`user/auth/signin`, { email, password })
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
    register(email, password, introducer) {
        return httpClient.post(`user/auth/signup`, {
            email,
            password,
            introducer
        });
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