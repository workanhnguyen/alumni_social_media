function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function sendEmail() {
    // For values
    const toMail = document.getElementById("email").value;
    const toName = document.getElementById("last-name").value + " " + document.getElementById("first-name").value;
    const fromName = "OU Media After Graduated";
    const accountName = document.getElementById("username").value;
    const accountPassword = document.getElementById("password").value;
    const replyTo = "OU Media After Graduated";

    // For checking
    const academicYear = document.getElementById("academic-year").value;
    const phone = document.getElementById("phone").value;
    const avatar = document.getElementById("avatar-file").files;
    const bgImage = document.getElementById("bg-image-file").files;
    const usernameExisting = document.getElementById("username-flag");
    const emailValid = toMail != null && isValidEmail(toMail);

    if (toMail !== null && toMail.toString().trim() !== ''
        && toName !== null && toName.trim() !== ''
        && fromName.trim() !== '' && accountName !== null
        && accountName.toString().trim() !== '' && accountPassword !== null
        && accountPassword.toString().trim() !== '' && replyTo.trim() !== ''
        && academicYear !== null && academicYear.toString().trim() !== ''
        && phone !== null && phone.toString().trim() !== ''
        && avatar.length > 0 && bgImage.length > 0
        && usernameExisting === null
        && emailValid) {

        console.log(true);

        var params = {
            to_mail: toMail.trim(),
            to_name: toName.trim(),
            from_name: fromName.trim(),
            account_name: accountName.trim(),
            account_password: accountPassword.trim(),
            reply_to: replyTo,
        }

        emailjs.send("service_x1pwrtx", "template_xq4emmb", params).then(function (res) {
            alert("Tạo tài khoản thành công");
        }).catch(function (e) {
            alert("Có lỗi xảy ra!");
        })
    }
}