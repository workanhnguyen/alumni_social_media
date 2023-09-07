<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/7/2023
  Time: 9:06 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<div class="container">
    <h1 class="text-center mt-3 mb-3">DANH SÁCH NHÓM</h1>
    <c:if test="${counter > 1}">
        <ul class="pagination">
            <c:forEach begin="1" end="${counter}" var="i">
                <c:url value="/groups" var="pageUrl">
                    <c:param name="page" value="${i}"></c:param>
                </c:url>
                <li class="page-item"><a class="page-link ${pageIndex == i ? 'bg-primary text-white' : ''}" href="${pageUrl}">${i}</a></li>
            </c:forEach>
        </ul>
    </c:if>

    <table class="table">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Tên nhóm</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${groups}" var="g">
            <tr class="align-middle">
                <th scope="row" id="postId">${g.id}</th>
                <td>${g.createdAt}</td>
                <td>${g.creatorId.lastName} ${g.creatorId.firstName}</td>
                <td>${g.groupName}</td>
                <td>
                    <c:url value="/api/groups/${g.id}/" var="apiDelete"/>
                    <a href="<c:url value="/groups/${g.id}"/>" class="btn btn-success">Xem chi tiết</a>
                    <button class="btn btn-danger" onclick="deletePost('${apiDelete}', '${authToken}')">Xóa</button>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
