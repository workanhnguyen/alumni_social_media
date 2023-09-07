function deletePost (path, authToken) {
    if (confirm("Bạn có chắc chắn xóa bài đăng này không?") === true) {
        fetch(path, {
            method: "delete",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                location.reload();
            } else if (res.status === 401)
                alert("Bạn không có quyền xóa bài đăng này");
        }).catch(error => {
            console.log(error);
            alert("Xóa thất bại!")
        })
    }
}