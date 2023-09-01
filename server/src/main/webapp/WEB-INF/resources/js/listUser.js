function deleteUser (path, authToken) {
    if (confirm("Bạn có chắc chắn xóa người dùng này không?") === true) {
        fetch(path, {
            method: "delete",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 204) {
                location.reload();
            } else if (res.status === 401)
                alert("Bạn không có quyền xóa người dùng này");
        }).catch(error => {
            console.log(error);
            alert("Xóa thất bại!")
        })
    }
}