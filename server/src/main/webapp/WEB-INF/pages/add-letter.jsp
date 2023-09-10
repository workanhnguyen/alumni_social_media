<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/7/2023
  Time: 1:31 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>
<script type="text/javascript">
    (function () {
        emailjs.init("CRhLh3c3U10jKJHyV");
    })();
</script>

<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">THÊM THƯ MỜI</h1>

    <div class="d-flex flex-column">
        <div class="d-block">
            <div class="form-floating mb-3 mt-3">
                <input type="text" class="form-control" id="letter-title-input" placeholder="Nhập tiêu đề ..."/>
                <label for="letter-title-input">Tiêu đề</label>
            </div>
            <div id="letter-title-alert" class="w-100 justify-content-center text-danger" style="display: none">
                <p style="margin: 0">Không được bỏ trống tiêu đề</p>
            </div>
        </div>
        <div class="d-block">
            <div class="form-floating mb-3 mt-3">
                <textarea style="height: 120px" type="text" class="form-control" id="letter-content-input"
                          placeholder="Nhập nội dung ..."></textarea>
                <label for="letter-title-input">Nội dung</label>
            </div>
            <div id="letter-content-alert" class="w-100 justify-content-center text-danger" style="display: none">
                <p style="margin: 0">Không được bỏ trống nội dung</p>
            </div>
        </div>
        <div class="w-100" id="btn-create-letter" style="margin-top: 12px">
            <c:url value="/api/letters/new/" var="addNewLetter"/>
            <button type="submit" class="w-100 btn btn-success" style="width: 120px"
                    onclick="createLetter('${addNewLetter}', '${authToken}')">Thêm mới
            </button>
        </div>
    </div>

    <div id="invited-list-guest"></div>

    <div id="list-guest" style="display: none; margin-top: 12px">
        <div class="d-flex justify-content-between align-items-center">
            <h5>Thêm danh sách khách mời:</h5>
            <%--            <a href="<c:url value="/letters" />" class="btn btn-success" style="width: 120px;">Hoàn thành</a>--%>
        </div>
        <select class="form-control" id="invite-selector-filter">
            <%--            <option value="all" selected>Tất cả</option>--%>
            <option value="toPerson" selected>Cá nhân</option>
            <option value="toGroup">Nhóm</option>
        </select>
        <%--        <div id="guest-all">--%>
        <%--            &lt;%&ndash; Iterate over the users and convert them to a JSON array &ndash;%&gt;--%>
        <%--            <c:set var="userArray">--%>
        <%--                <c:forEach items="${users}" var="user" varStatus="loop">--%>
        <%--                    <c:set var="userJson">--%>
        <%--                        {--%>
        <%--                            "id": "${user.id}",--%>
        <%--                            "lastName": "${user.lastName}",--%>
        <%--                            "firstName": "${user.firstName}",--%>
        <%--                            "email": "${user.email}"--%>
        <%--                        }--%>
        <%--                    </c:set>--%>
        <%--                    <c:if test="${!loop.last}">--%>
        <%--                        ${userJson},--%>
        <%--                    </c:if>--%>
        <%--                    <c:if test="${loop.last}">--%>
        <%--                        ${userJson}--%>
        <%--                    </c:if>--%>
        <%--                </c:forEach>--%>
        <%--            </c:set>--%>
        <%--            <button style="margin-top: 6px" id="btn-all" class="w-100 btn btn-success"--%>
        <%--                    onclick="inviteAll('${authToken}')">Gửi thư mời đến tất cả--%>
        <%--            </button>--%>
        <%--        </div>--%>
        <div id="guest-group" style="display: none; margin-top: 24px">
            <div style="max-height: 400px; overflow-y: scroll">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên nhóm</th>
                        <th scope="col">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${groups}" var="g">
                        <tr class="align-middle" id="group-row-${g.id}">
                            <th scope="row" id="groupId">${g.id}</th>

                            <td>${g.groupName}</td>
                            <td>
                                <button class="btn btn-primary" onclick="inviteGroup(${g.id}, '${authToken}')">Thêm
                                </button>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="guest-person" style="margin-top: 24px">
            <div style="max-height: 400px; overflow-y: scroll">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ảnh đại diện</th>
                        <th scope="col">Họ và tên đệm</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${users}" var="u">
                        <tr class="align-middle" id="user-row-${u.id}">
                            <th scope="row" id="userId">${u.id}</th>
                            <td>
                                <div style="width: 60px; height: 60px;" class="rounded-circle overflow-hidden">
                                    <img src="${u.avatar}" alt="avatar-${u.username}" class="w-100 h-100"/>
                                </div>
                            </td>

                            <td>${u.lastName}</td>
                            <td>${u.firstName}</td>
                            <td>
                                <c:choose>
                                    <c:when test="${u.role == 'ROLE_ALUMNI'}">
                                        Cựu sinh viên
                                    </c:when>
                                    <c:when test="${u.role == 'ROLE_LECTURER'}">
                                        Giảng viên
                                    </c:when>
                                    <c:otherwise>
                                        Không xác định
                                    </c:otherwise>
                                </c:choose>
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${u.isActive == false}">
                                        Bị khóa
                                    </c:when>
                                    <c:otherwise>
                                        Đang sử dụng
                                    </c:otherwise>
                                </c:choose>
                            </td>
                            <td>
                                <button id="btn-user-row-${u.id}" class="btn btn-primary" onclick="invitePerson('${u.id}', '${u.email}', '${u.lastName}', '${u.firstName}', '${authToken}')">Thêm
                                </button>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="w-100">
            <a href="<c:url value="/letters" />" class="w-100 btn btn-success">Hoàn tất</a>
        </div>
    </div>
</div>
<script src="<c:url value="/js/addLetter.js" />"></script>
