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

<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">THÊM THƯ MỜI</h1>

    <div class="d-flex flex-column">
        <div class="d-block">
            <div class="form-floating mb-3 mt-3">
                <input type="text" class="form-control" id="letter-title-input" placeholder="Nhập tiêu đề ..."/>
                <label for="letter-title-input">Tiêu đề</label>
            </div>
            <div id="letter-title-alert" class="w-100 justify-content-center text-danger" style="display: none">
                <p>Không được bỏ trống tiêu đề</p>
            </div>
        </div>
        <div class="d-block">
            <div class="form-floating mb-3 mt-3">
                <textarea style="height: 120px" type="text" class="form-control" id="letter-content-input"
                          placeholder="Nhập nội dung ..."></textarea>
                <label for="letter-title-input">Nội dung</label>
            </div>
            <div id="letter-content-alert" class="w-100 justify-content-center text-danger" style="display: none">
                <p>Không được bỏ trống nội dung</p>
            </div>
        </div>
        <div class="w-100">
            <button type="submit" id="btn-create-group" class="w-100 btn btn-success" style="width: 120px"
                    onclick="createLetter('${authToken}')">Thêm mới
            </button>
        </div>
    </div>

    <div id="invited-list-guest"></div>

    <div id="list-guest" style="margin-top: 12px">
        <div class="d-flex justify-content-between align-items-center">
            <h5>Thêm danh sách khách mời:</h5>
            <%--            <a href="<c:url value="/letters" />" class="btn btn-success" style="width: 120px;">Hoàn thành</a>--%>
        </div>
        <select class="form-control" id="invite-selector-filter">
            <option value="all" selected>Tất cả</option>
            <option value="toGroup">Nhóm</option>
            <option value="toPerson">Cá nhân</option>
        </select>
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
        <div id="guest-person" style="display: none; margin-top: 24px">
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
                                <button class="btn btn-primary" onclick="invitePerson(${u.id}, '${authToken}')">Thêm
                                </button>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script src="<c:url value="/js/addLetter.js" />"></script>
