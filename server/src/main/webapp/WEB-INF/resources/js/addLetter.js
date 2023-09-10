let letterId = '';

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

function hideGroupRow(groupId) {
    const groupRow = document.getElementById(`group-row-${groupId}`);
    if (groupRow) {
        groupRow.style.display = 'none';
    }
}

function changeInviteFiler() {
    const inviteSelectorDOM = document.getElementById("invite-selector-filter");

    // const guestAllDOM = document.getElementById("guest-all");
    const guestGroupDOM = document.getElementById("guest-group");
    const guestPersonDOM = document.getElementById("guest-person");

    inviteSelectorDOM.addEventListener("change", function () {
        switch (inviteSelectorDOM.value) {
            // case 'all':
            //     guestAllDOM.style.display = 'block';
            //     guestGroupDOM.style.display = 'none';
            //     guestPersonDOM.style.display = 'none';
            //     break;
            case 'toGroup':
                // guestAllDOM.style.display = 'none';
                guestGroupDOM.style.display = 'block';
                guestPersonDOM.style.display = 'none';
                break;
            case 'toPerson':
                // guestAllDOM.style.display = 'none';
                guestGroupDOM.style.display = 'none';
                guestPersonDOM.style.display = 'block';
                break;
            default:
                break;
        }
    })
}

function createLetter(path, authToken) {
    const btnCreateLetterDOM = document.getElementById("btn-create-letter");
    const letterTitleDOM = document.getElementById("letter-title-input");
    const letterContentDOM = document.getElementById("letter-content-input");

    // For check
    const titleAlertDOM = document.getElementById("letter-title-alert");
    const contentAlertDOM = document.getElementById("letter-content-alert");

    titleAlertDOM.style.display = `${letterTitleDOM.value.trim() === '' ? 'flex' : 'none'}`;
    contentAlertDOM.style.display = `${letterContentDOM.value.trim() === '' ? 'flex' : 'none'}`;

    if (letterTitleDOM.value.toString().trim() !== '' && letterContentDOM.value.toString().trim() !== '') {

        const requestBody = JSON.stringify({
            "content": letterTitleDOM.value,
            "description": letterContentDOM.value
        });

        fetch(path, {
            method: "post",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: requestBody
        }).then(res => {
            if (res.status === 201) {
                alert("Thêm thư mời thành công!");
                document.getElementById("btn-create-letter").style.display = 'none';
                document.getElementById("list-guest").style.display = 'block';
                letterTitleDOM.readOnly = true;
                letterContentDOM.readOnly = true;
            }
            return res.json();
        }).then(data => letterId = data.id).catch(e => {
            alert("Thêm thư mời thất bại!");
        })
    }
}

function invitePerson(id, email, lastName, firstName, authToken) {
    document.getElementById(`btn-user-row-${id}`).disabled = true;
    document.getElementById(`btn-user-row-${id}`).innerHTML = "Đang gửi...";

    fetch(`/server/api/letters/${letterId}/add_user/${id}`, {
        method: "post",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 200) {

            var params = {
                to_mail: email,
                to_name: `${lastName} ${firstName}`,
                from_name: "OU Media After Graduated",
                reply_to: "OU Media After Graduated",
                event_title: document.getElementById("letter-title-input").value,
                event_content: document.getElementById("letter-content-input").value
            }

            emailjs.send("service_x1pwrtx", "template_5ebi1t7", params).then(function (res) {
                document.getElementById(`user-row-${id}`).style.display = 'none';
                alert("Gửi lời mời thành công!");
            }).catch(function (e) {
                alert("Có lỗi xảy ra!");
            })
        }
    })
}

function inviteGroup(groupId, authToken) {

    document.getElementById(`btn-group-row-${groupId}`).disabled = true;
    document.getElementById(`btn-group-row-${groupId}`).innerHTML = "Đang gửi...";

    fetch(`/server/api/groups/${groupId}/members`, {
        method: "get",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.usersSet.length; i++) {
                fetch(`/server/api/letters/${letterId}/add_user/${data.usersSet[i].id}`, {
                    method: "post",
                    headers: {
                        "Authorization": authToken,
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {

                        const params = {
                            to_mail: data.usersSet[i].email,
                            to_name: `${data.usersSet[i].lastName} ${data.usersSet[i].firstName}`,
                            from_name: "OU Media After Graduated",
                            reply_to: "OU Media After Graduated",
                            event_title: document.getElementById("letter-title-input").value,
                            event_content: document.getElementById("letter-content-input").value
                        };

                        emailjs.send("service_x1pwrtx", "template_5ebi1t7", params).then(function (res) {
                        });
                    }
                })
            }
            document.getElementById(`group-row-${groupId}`).style.display = 'none';
            alert("Gửi lời mời thành công!");
        })
        .catch(e => console.log(e));
}

onLoad();
changeInviteFiler();