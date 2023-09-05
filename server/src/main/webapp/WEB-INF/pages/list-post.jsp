<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/4/2023
  Time: 6:07 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<c:url value="/posts" var="searchPostByUsername"/>
<div class="container">
    <h1 class="text-center mt-3 mb-3">DANH SÁCH BÀI ĐĂNG</h1>
    <c:if test="${counter > 1}">
        <ul class="pagination">
            <c:forEach begin="1" end="${counter}" var="i">
                <c:url value="/posts" var="pageUrl">
                    <c:param name="page" value="${i}"></c:param>
                </c:url>
                <li class="page-item"><a class="page-link ${pageIndex == i ? 'bg-primary text-white' : ''}" href="${pageUrl}">${i}</a></li>
            </c:forEach>
        </ul>
    </c:if>
    <nav class="navbar navbar-expand-md navbar-light">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#openMoreAction">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="openMoreAction">
            <form class="d-flex form-inline my-2 my-lg-0" action="${searchPostByUsername}">
                <input class="form-control" name="username" type="search"
                       placeholder="${usernamePlaceholder == null || usernamePlaceholder == '' ? 'Tìm tên người tạo...' : usernamePlaceholder}"
                       aria-label="Search">
                <button class="btn btn-success" type="submit" }>Tìm</button>
            </form>
        </div>
    </nav>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Người tạo</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Trạng thái bình luận</th>
                <th scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${posts}" var="p">
                <tr class="align-middle">
                    <th scope="row" id="postId">${p.id}</th>
                    <td>${p.createdAt}</td>
                    <td>${p.user.lastName} ${p.user.firstName}</td>
                    <c:choose>
                        <c:when test="${p.user.role == 'ROLE_ALUMNI'}">
                            <td>Cựu sinh viên</td>
                        </c:when>
                        <c:when test="${p.user.role == 'ROLE_LECTURER'}">
                            <td>Giảng viên</td>
                        </c:when>
                        <c:otherwise>
                            <td>Quản trị viên</td>
                        </c:otherwise>
                    </c:choose>
                    <td>
                        ${p.isLocked == true ? 'Bị khóa' : 'Đang mở'}
                    </td>
                    <td>
                        <c:url value="/api/posts/${p.id}/" var="apiDelete"/>
                        <a href="<c:url value="/posts/${p.id}" /> " class="btn btn-success">Xem chi tiết</a>
                        <button class="btn btn-danger" onclick="deletePost('${apiDelete}', '${authToken}')">Xóa</button>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>
<script src="<c:url value="/js/listPost.js" />"></script>