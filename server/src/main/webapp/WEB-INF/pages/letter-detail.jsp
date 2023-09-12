<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/5/2023
  Time: 7:47 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">CHI TIẾT THƯ MỜI</h1>
    <div class="form-floating mb-3 mt-3">
        <input type="text" class="form-control" id="letter-id" value="${letter.id}" disabled/>
        <label for="letter-id">ID</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <input type="text" class="form-control" id="created-at" value="${letter.createdAt}" disabled/>
        <label for="created-at">Ngày tạo</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <input type="text" class="form-control" id="letter-title" value="${letter.content}" readonly/>
        <label for="letter-title">Tiêu đề</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <textarea type="text" class="form-control" style="height: 260px" id="letter-content" readonly>${letter.description}</textarea>
        <label for="letter-content">Nội dung</label>
    </div>
    <div>
        <h5>Danh sách khách mời:</h5>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Ảnh đại diện</th>
                <th scope="col">Họ và tên đệm</th>
                <th scope="col">Tên</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Trạng thái</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${letter.usersSet}" var="u">
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
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
    <a href="<c:url value="/letters" />" class="w-100 btn btn-success">Trở lại</a>
</div>
