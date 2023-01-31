const AdminOrder = (httpClient) => ({
    fetch() {
        return httpClient.fetch(`admin/orders/get`);
    },
})

export default AdminOrder