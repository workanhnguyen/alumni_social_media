<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/29/2023
  Time: 5:00 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<c:url value="/users" var="searchByUsername" />

<div class="container">
    <h1 class="text-center mt-3 mb-3">DANH SÁCH NGƯỜI DÙNG</h1>
    <c:if test="${counter > 1}">
        <ul class="pagination">
            <c:forEach begin="1" end="${counter}" var="i">
                <c:url value="/users" var="pageUrl">
                    <c:param name="page" value="${i}"></c:param>
                </c:url>
                <li class="page-item"><a class="page-link ${pageIndex == i ? 'bg-primary text-white' : ''}" href="${pageUrl}">${i}</a></li>
            </c:forEach>
        </ul>
    </c:if>
    <nav class="navbar navbar-expand-md navbar-light">
        <a href="<c:url value="/users/new" />" class="btn btn-success">+ Thêm người dùng</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#openMoreAction">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-around align-items-center ml-md-3" id="openMoreAction">
            <ul class="navbar-nav">
                <li class="d-flex align-items-center w-md-100">
                    <p class="mb-0" style="margin-right: 12px;">Bộ lọc</p>
                </li>
                <li>
                    <a class="btn px-4 py-2 text-decoration-none ${role == null && active == null ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}"
                       href="<c:url value="/" />">Tất cả</a></li>
                <li>
                    <a class="btn px-4 py-2 text-decoration-none ${role == 'ROLE_ALUMNI' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}"
                       href="<c:url value="/users?role=ROLE_ALUMNI" />">Cựu sinh viên</a></li>
                <li>
                    <a class="btn px-4 py-2 text-decoration-none ${role == 'ROLE_LECTURER' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}"
                       href="<c:url value="/users?role=ROLE_LECTURER" />">Giảng viên</a>
                </li>
                <li>
                    <a class="btn px-4 py-2 text-decoration-none ${active == 'true' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}"
                       href="<c:url value="/users?active=true" />">Đang sử dụng</a></li>
                <li>
                    <a class="btn px-4 py-2 text-decoration-none ${active == 'false' ? 'bg-primary text-white' : 'border border-primary bg-white text-black'}"
                       href="<c:url value="/users?active=false" />">Bị khóa</a>
                </li>
            </ul>
            <form class="d-flex form-inline my-2 my-lg-0" action="${searchByUsername}">
                <input class="form-control me-2" name="username" type="search" placeholder="${usernamePlaceholder == null || usernamePlaceholder == '' ? 'Nhập tên đăng nhập...' : usernamePlaceholder}" aria-label="Search">
                <button class="btn btn-success" type="submit"}>Tìm</button>
            </form>
        </div>
    </nav>
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
            <tr class="align-middle">
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
                    <c:url value="/api/users/${u.id}/" var="apiLock"/>
                    <a href="<c:url value="/users/${u.id}" />" class="btn btn-success">Cập nhật</a>
                    <button class="btn ${u.isActive == false ? 'btn-secondary' : 'btn-danger' }" ${u.isActive == false ? 'disabled' : ''} onclick="deleteUser('${apiLock}', '${authToken}')">${u.isActive == false ? "Đã khóa" : "Khóa" }</button>
                </td>
<%--                <sec:authorize access="hasRole('ROLE_ADMIN')">--%>
<%--                    <td>--%>
<%--                        <c:url value="/api/users/${u.id}/" var="apiDel"/>--%>
<%--                        <a href="<c:url value="/users/${u.id}" />" class="btn btn-success">Cập nhật</a>--%>
<%--                        <button class="btn btn-danger" onclick="deleteUser('${apiDel}', '${authToken}')">Xóa</button>--%>
<%--                    </td>--%>
<%--                </sec:authorize>--%>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<script src="<c:url value="/js/listUser.js" />"></script>
