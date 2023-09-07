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
    <h1 class="text-center mt-3 mb-3">THÊM NHÓM</h1>

    <div class="d-flex flex-row form-floating mb-3 mt-3">
            <input type="text" class="form-control" id="group-name-input" placeholder="Nhập tên nhóm ..."/>
            <label for="group-name-input">Tên nhóm</label>
        <button type="submit" id="btn-create-group" class="btn btn-success" style="width: 120px" onclick="createGroup('${authToken}')">Thêm mới</button>
    </div>
    <div id="group-alert" class="w-100 justify-content-center text-danger" style="display: none">
        <p>Không được bỏ trống tên nhóm</p>
    </div>

    <div id="list-user" style="display: none">
        <div class="d-flex justify-content-between align-items-center">
            <h5>Thêm thành viên vào nhóm</h5>
            <a href="<c:url value="/groups" />" class="btn btn-success" style="width: 120px;">Hoàn thành</a>
        </div>
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
                            <img src="${u.avatar}" alt="avatar-${u.username}" class="w-100 h-100" />
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
                        <button class="btn btn-primary" onclick="addUserToGroup(${u.id}, '${authToken}')">Thêm</button>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>
<script src="<c:url value="/js/addGroup.js" />"></script>
