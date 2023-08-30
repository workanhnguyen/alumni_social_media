<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/30/2023
  Time: 2:55 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">CHI TIẾT NGƯỜI DÙNG</h1>
    <form>
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <input type="text" class="form-control" id="username" disabled value="${user.username}">
        </div>
        <div class="form-group">
            <label for="last-name">Họ và tên đệm</label>
            <input type="text" class="form-control" id="last-name" aria-describedby="emailHelp" placeholder="Nhập họ và tên đệm" value="${user.lastName}">
            <%--        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>--%>
        </div>
        <div class="form-group">
            <label for="first-name">Tên</label>
            <input type="text" class="form-control" id="first-name" placeholder="Nhập tên" value="${user.firstName}">
        </div>
        <c:if test="${user.role == 'ALUMNI'}">
            <div class="form-group">
                <label for="studentId">Mã số sinh viên</label>
                <input type="text" class="form-control" id="studentId" value="${user.studentId}">
            </div>
            <div class="form-group">
                <label for="department">Khoa</label>
                <select class="form-select" id="department">
                    <c:forEach items="${departments}" var="d">
                        <c:choose>
                            <c:when test="${d.id == user.majorId.departmentId.id}">
                                <option value="${d.id}" selected>${d.name}</option>
                            </c:when>
                            <c:otherwise>
                                <option value="${d.id}">${d.name}</option>
                            </c:otherwise>
                        </c:choose>

                    </c:forEach>
                </select>
            </div>
            <div class="form-group">
                <label for="major">Ngành học</label>
                <select class="form-select" id="major">
                    <option value="${user.majorId.id}">${user.majorId.name}</option>
                </select>
            </div>
        </c:if>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Nhập email" value="${user.email}">
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại" value="${user.phone}">
        </div>
        <div class="form-group">
            <div class="input-group my-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="isActive">Tình trạng</label>
                </div>
                <select class="custom-select" id="isActive">
                    <c:choose>
                        <c:when test="${user.isActive == true}">
                            <option value="true" selected>Đang sử dụng</option>
                            <option value="false">Vô hiệu hóa</option>
                        </c:when>
                        <c:otherwise>
                            <option value="false" selected>Đang bị khóa</option>
                            <option value="true">Mở khóa</option>
                        </c:otherwise>
                    </c:choose>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="role">Vai trò</label>
            <c:choose>
                <c:when test="${user.role == 'ALUMNI'}">
                    <input type="text" class="form-control" id="role" disabled value="Cựu sinh viên">
                </c:when>
                <c:otherwise>
                    <input type="text" class="form-control" id="role" disabled value="Giảng viên">
                </c:otherwise>
            </c:choose>
        </div>
        <button type="submit" class="btn btn-success mt-3">Cập nhật</button>
    </form>
</div>
<script src="<c:url value="/js/user.js" />"></script>