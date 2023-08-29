<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/29/2023
  Time: 4:58 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/" var="listUser" />
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href=${listUser}>OU MEDIA</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav me-auto">

        <c:choose>
          <c:when test="${pageContext.request.userPrincipal.name != null}">
            <li class="nav-item">
              <a class="nav-link" href="${listUser}">Người dùng</a>
            </li>
          </c:when>
        </c:choose>
      </ul>
      <c:choose>
        <c:when test="${pageContext.request.userPrincipal.name != null}">
          <div class="d-flex justify-content-center align-items-center bg-primary rounded" style="width: fit-content">
            <p class="text-white p-2 m-0">Xin chào ${pageContext.request.userPrincipal.name}</p>
          </div>
        </c:when>
      </c:choose>
    </div>
  </div>
</nav>
