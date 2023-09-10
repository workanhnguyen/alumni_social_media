let createdGroup = {};
function onLoad() {
    window.addEventListener("beforeunload", function (e) {
        // Prompt a confirmation dialog
        const confirmationMessage = "Bạn có chắc chắn muốn thoát?";
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });
}
function hideUserRow(userId) {
    const userRow = document.getElementById(`user-row-${userId}`);
    if (userRow) {
        userRow.style.display = 'none';
    }
}
function createGroup (authToken) {
    const btnCreateGroupDOM = document.getElementById("btn-create-group");
    const groupNameInputDOM = document.getElementById("group-name-input");
    const groupAlertDOM = document.getElementById("group-alert");
    const listUserDOM = document.getElementById("list-user");

    if (groupNameInputDOM.value !== '') {
        const requestBody = JSON.stringify({
            "group_name": groupNameInputDOM.value
        });
        fetch("/server/api/groups/new/", {
            method: "post",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: requestBody
        }).then(res => {
            if (res.status === 201) {
                btnCreateGroupDOM.style.display = 'none';
                groupAlertDOM.style.display = 'none';
                groupNameInputDOM.readOnly = true;
                listUserDOM.style.display = 'block';

                return res.json();
            }
        }).then(data => createdGroup = data);
    } else {
        groupAlertDOM.style.display = 'flex';
    }
}

function addUserToGroup(userId, authToken) {
    fetch(`/server/api/groups/${createdGroup.id}/add_user/${userId}`, {
        method: "post",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
    }).then(res => {
        hideUserRow(userId);
        return res.json();
    });
}

onLoad();