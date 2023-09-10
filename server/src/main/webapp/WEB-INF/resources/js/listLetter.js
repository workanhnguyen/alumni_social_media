function deleteLetter(path, authToken) {
    if (confirm("Bạn có chắc chắn muốn xóa thư mời này không?") === true) {
        fetch(path, {
            method: "delete",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 204) {
                alert("Xóa thành công!");
                window.location.reload();
            }
        }).catch(e => console.log(e));
    }
}