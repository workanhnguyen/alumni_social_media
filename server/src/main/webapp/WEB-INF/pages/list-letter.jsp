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

<%--<c:url value="/posts" var="searchPostByUsername"/>--%>
<div class="container">
    <h1 class="text-center mt-3 mb-3">DANH SÁCH THƯ MỜI</h1>
    <nav class="navbar navbar-expand-md navbar-light">
        <a href="<c:url value="/letters/new" />" class="btn btn-success">+ Thêm thư mời</a>
    </nav>
    <c:if test="${counter > 1}">
        <ul class="pagination">
            <c:forEach begin="1" end="${counter}" var="i">
                <c:url value="/letters" var="pageUrl">
                    <c:param name="page" value="${i}"></c:param>
                </c:url>
                <li class="page-item"><a class="page-link ${pageIndex == i ? 'bg-primary text-white' : ''}"
                                         href="${pageUrl}">${i}</a></li>
            </c:forEach>
        </ul>
    </c:if>

    <table class="table">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Hành động</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${letters}" var="l">
            <tr class="align-middle">
                <th scope="row" id="letterId">${l.id}</th>
                <td>${l.createdAt}</td>
                <td>${l.content}</td>
                <td>
                    <a class="btn btn-success" href="<c:url value="/letters/${l.id}/"/>">Xem chi tiết</a>
                    <c:url value="/api/letters/${l.id}/" var="apiDelete"/>
                    <button class="btn btn-danger" onclick="deleteLetter('${apiDelete}', '${authToken}')">Xóa</button>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<script src="<c:url value="/js/listLetter.js" />"></script>