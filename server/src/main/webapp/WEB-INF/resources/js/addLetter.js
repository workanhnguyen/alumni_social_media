function changeInviteFiler() {
    const inviteSelectorDOM = document.getElementById("invite-selector-filter");

    const guestGroupDOM = document.getElementById("guest-group");
    const guestPersonDOM = document.getElementById("guest-person");

    inviteSelectorDOM.addEventListener("change", function () {
        switch (inviteSelectorDOM.value) {
            case 'all':
                guestGroupDOM.style.display = 'none';
                guestPersonDOM.style.display = 'none';
                break;
            case 'toGroup':
                guestGroupDOM.style.display = 'block';
                guestPersonDOM.style.display = 'none';
                break;
            case 'toPerson':
                guestGroupDOM.style.display = 'none';
                guestPersonDOM.style.display = 'block';
                break;
            default:
                break;
        }
    })
}

function createLetter(path, authToken) {
    const letterTitleDOM = document.getElementById("letter-title-input");
    const letterContentDOM = document.getElementById("letter-content-input");

    // For check
    const titleAlertDOM = document.getElementById("letter-title-alert");
    const contentAlertDOM = document.getElementById("letter-content-alert");

    if (letterTitleDOM.value.toString().trim() === '') {
        titleAlertDOM.style.display = 'flex';
        return;
    }

    if (contentAlertDOM.value.toString().trim() === '') {
        contentAlertDOM.style.display = 'flex';
        return;
    }

    fetch(path, {
        method: "post",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
    })
}

changeInviteFiler();