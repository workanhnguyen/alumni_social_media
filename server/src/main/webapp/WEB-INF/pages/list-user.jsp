<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/29/2023
  Time: 5:00 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">DANH SÁCH NGƯỜI DÙNG</h1>
    <div class="input-group mb-3">
        <a class="px-4 py-2 text-decoration-none ${role == 'ALL' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}" href="<c:url value="/" />">Tất cả</a>
        <a class="px-4 py-2 text-decoration-none ${role == 'ALUMNI' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}" href="<c:url value="/users?role=ALUMNI" />">Cựu sinh viên</a>
        <a class="px-4 py-2 text-decoration-none ${role == 'LECTURER' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}" href="<c:url value="/users?role=LECTURER" />">Giảng viên</a>
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
            <tr>
                <th scope="row" id="userId">${u.id}</th>
                <td>
                    <img src="${u.avatar}" alt="avatar-${u.username}" width="120" />
                </td>

                <td>${u.lastName}</td>
                <td>${u.firstName}</td>
                <td>
                    <c:choose>
                        <c:when test="${u.role == 'ALUMNI'}">
                            Cựu sinh viên
                        </c:when>
                        <c:otherwise>
                            Giảng viên
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
<%--                    <c:url value="/users/${u.id}" var="apiDel" />--%>
                    <a href="<c:url value="/users/${u.id}" />" class="btn btn-success">Cập nhật</a>
                    <button class="btn btn-danger" onclick="delPro('${apiDel}', ${p.id})">Xóa</button>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<script src="<c:url value="/js/user.js" />"></script>
