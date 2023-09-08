function changeGroupName (path, authToken) {
    const groupNameInputDOM = document.getElementById("group-name");

    if (groupNameInputDOM.value.toString().trim() !== '') {

        const requestBody = {
            "group_name": groupNameInputDOM.value
        };

        fetch(path, {
            method: "put",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (res.status === 200) {
                alert("Đổi tên thành công!")
            } else if (res.status === 401) {
                alert("Bạn không có quyền đổi tên nhóm!")
            }
        }).catch(e => {
            alert("Đã xảy ra lỗi!");
        })
    }
}