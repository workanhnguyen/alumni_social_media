<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/30/2023
  Time: 2:55 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:url value="/users/${u.id}" var="addNewUser" />
<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">CHI TIẾT NGƯỜI DÙNG</h1>

    <form:form method="post" action="${addNewUser}" modelAttribute="user" enctype="multipart/form-data">
        <form:errors path="*" element="div" cssClass="alert alert-danger" />
        <form:hidden path="id" />
        <form:hidden path="password" />
        <form:hidden path="avatar" />
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="username" path="username" readonly="true" />
            <label for="username">Tên đăng nhập</label>
            <form:errors path="username" element="div" class="text-danger" />
        </div>
        <div class="form-floating mb-3 mt-3">
            
            <form:input type="text" class="form-control" id="last-name" path="lastName" />
            <label for="last-name">Họ và tên đệm</label>
            <form:errors path="lastName" element="div" class="text-danger" />
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="first-name" path="firstName" />
            <label for="first-name">Tên</label>
            <form:errors path="firstName" element="div" class="text-danger" />
        </div>
        <c:if test="${user.role == 'ROLE_ALUMNI'}">
            <div class="form-floating mb-3 mt-3">
                <form:input type="text" class="form-control" id="student-id" path="studentId"/>
                <label for="student-id">Mã số sinh viên</label>
            </div>
            <div class="form-floating mb-3 mt-3">
                <form:select class="form-select" id="department" path="majorId.departmentId">
                    <c:forEach items="${departments}" var="d">
                        <c:choose>
                            <c:when test="${user.majorId == null}">
                                <c:choose>
                                    <c:when test="${d.id == 1}">
                                        <option value="${d.id}" selected>${d.name}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${d.id}">${d.name}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:when>
                            <c:when test="${d.id == user.majorId.departmentId.id}">
                                <option value="${d.id}" selected>${d.name}</option>
                            </c:when>
                            <c:otherwise>
                                <option value="${d.id}">${d.name}</option>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                </form:select>
                <label for="department">Khoa</label>
            </div>
            <div class="form-floating mb-3 mt-3">
                <form:select class="form-select" id="major" path="majorId">
                    <c:forEach items="${majors}" var="m">
                        <c:choose>
                            <c:when test="${m.id == user.majorId.id}">
                                <option value="${m.id}" selected>${m.name}</option>
                            </c:when>
                            <c:otherwise>
                                <option value="${m.id}">${m.name}</option>
                            </c:otherwise>
                        </c:choose>

                    </c:forEach>
                </form:select>
                <label for="major">Ngành học</label>
            </div>
        </c:if>
        <div class="form-floating mb-3 mt-3">
            <form:input type="email" class="form-control" id="email" path="email" />
            <label for="email">Email</label>
            <form:errors path="email" element="div" class="text-danger" />
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="file" class="form-control"
                        path="avatarFile" id="avatar"  />
            <label for="avatar">Ảnh đại diện</label>
            <c:if test="${user.avatar != null}">
                <img src="${user.avatar}" width="120" />
            </c:if>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="phone" path="phone"/>
            <label for="phone">Số điện thoại</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:select class="form-select" id="is-active" path="isActive">
                            <option value="true" ${user.isActive ? 'selected' : ''}>Mở khóa</option>
                            <option value="false" ${!user.isActive ? 'selected' : ''}>Khóa</option>
            </form:select>
            <label for="is-active">Tình trạng</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:hidden path="role" />
            <c:choose>
                <c:when test="${user.role == 'ALUMNI'}">
                    <input type="text" class="form-control" id="role" disabled value="Cựu sinh viên">
                </c:when>
                <c:otherwise>
                    <input type="text" class="form-control" id="role" disabled value="Giảng viên">
                </c:otherwise>
            </c:choose>
            <label for="role">Vai trò</label>
        </div>
        <button type="submit" class="w-100 btn btn-success mt-3">Cập nhật</button>
    </form:form>
</div>
<script src="<c:url value="/js/userDetail.js" />"></script>