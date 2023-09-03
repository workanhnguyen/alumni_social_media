<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/3/2023
  Time: 9:42 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:url value="/users/new" var="updatedUser"/>
<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">THÊM NGƯỜI DÙNG</h1>

    <form:form method="post" action="${addNewUser}" modelAttribute="user" enctype="multipart/form-data">
<%--        <form:errors path="*" element="div" cssClass="alert alert-danger"/>--%>
        <form:hidden path="id"/>
        <form:hidden path="avatar"/>
        <form:hidden path="bgImage"/>
        <form:hidden path="isActive" />

        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="username" path="username"/>
            <label for="username">Tên đăng nhập</label>
            <form:errors path="username" element="div" class="text-danger"/>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="password" path="password" value="ou@123" readonly="true"/>
            <label for="username">Mật khẩu</label>
            <form:errors path="password" element="div" class="text-danger"/>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="last-name" path="lastName"/>
            <label for="last-name">Họ và tên đệm</label>
            <form:errors path="lastName" element="div" class="text-danger"/>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="first-name" path="firstName"/>
            <label for="first-name">Tên</label>
            <form:errors path="firstName" element="div" class="text-danger"/>
        </div>
<%--        <c:if test="${user.role == 'ROLE_ALUMNI'}">--%>
<%--            <div class="form-floating mb-3 mt-3">--%>
<%--                <form:input type="text" class="form-control" id="student-id" path="studentId"/>--%>
<%--                <label for="student-id">Mã số sinh viên</label>--%>
<%--            </div>--%>
<%--            <div class="form-floating mb-3 mt-3">--%>
<%--                <form:select class="form-select" id="department" path="majorId.departmentId">--%>
<%--                    <c:forEach items="${departments}" var="d">--%>
<%--                        <c:choose>--%>
<%--                            <c:when test="${user.majorId == null}">--%>
<%--                                <c:choose>--%>
<%--                                    <c:when test="${d.id == 1}">--%>
<%--                                        <option value="${d.id}" selected>${d.name}</option>--%>
<%--                                    </c:when>--%>
<%--                                    <c:otherwise>--%>
<%--                                        <option value="${d.id}">${d.name}</option>--%>
<%--                                    </c:otherwise>--%>
<%--                                </c:choose>--%>
<%--                            </c:when>--%>
<%--                            <c:when test="${d.id == user.majorId.departmentId.id}">--%>
<%--                                <option value="${d.id}" selected>${d.name}</option>--%>
<%--                            </c:when>--%>
<%--                            <c:otherwise>--%>
<%--                                <option value="${d.id}">${d.name}</option>--%>
<%--                            </c:otherwise>--%>
<%--                        </c:choose>--%>
<%--                    </c:forEach>--%>
<%--                </form:select>--%>
<%--                <label for="department">Khoa</label>--%>
<%--            </div>--%>
<%--            <div class="form-floating mb-3 mt-3">--%>
<%--                <form:select class="form-select" id="major" path="majorId">--%>
<%--                    <c:forEach items="${majors}" var="m">--%>
<%--                        <c:choose>--%>
<%--                            <c:when test="${user.majorId == null}">--%>
<%--                                <c:when test="${m.id == 1}">--%>
<%--                                    <option value="${m.id}" selected>${m.name}</option>--%>
<%--                                </c:when>--%>
<%--                                <c:otherwise>--%>
<%--                                    <option value="${m.id}">${m.name}</option>--%>
<%--                                </c:otherwise>--%>
<%--                            </c:when>--%>
<%--                            <c:when test="${m.id == user.majorId.id}">--%>
<%--                                <option value="${m.id}" selected>${m.name}</option>--%>
<%--                            </c:when>--%>
<%--                            <c:otherwise>--%>
<%--                                <option value="${m.id}">${m.name}</option>--%>
<%--                            </c:otherwise>--%>
<%--                        </c:choose>--%>

<%--                    </c:forEach>--%>
<%--                </form:select>--%>
<%--                <label for="major">Ngành học</label>--%>
<%--            </div>--%>
<%--        </c:if>--%>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="academic-year" path="academicYear"/>
            <label for="academic-year">${user.role == 'ROLE_ALUMNI' ? "Năm học" : "Học hàm, học vị"}</label>
            <c:if test="${isAcademicYearEmpty == true && user.role == 'ROLE_LECTURER'}">
                <div class="text-danger">Hoc ham hoc vi khong duoc bo trong</div>
            </c:if>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="email" class="form-control" id="email" path="email"/>
            <label for="email">Email</label>
            <form:errors path="email" element="div" class="text-danger"/>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="file" class="form-control"
                        path="avatarFile" id="avatar"/>
            <label for="avatar">Ảnh đại diện</label>
            <c:if test="${isAvatarFileEmpty == true}">
                <div class="text-danger">Anh dai dien khong duoc bo trong</div>
            </c:if>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="file" class="form-control"
                        path="bgImageFile" id="bgImage"/>
            <label for="bgImage">Ảnh bìa</label>
            <c:if test="${isBgImageFileEmpty == true}">
                <div class="text-danger">Anh bia khong duoc bo trong</div>
            </c:if>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="phone" path="phone"/>
            <label for="phone">Số điện thoại</label>
            <c:if test="${isPhoneEmpty == true}">
                <div class="text-danger">So dien thoai khong duoc bo trong</div>
            </c:if>
        </div>
<%--        <div class="form-floating mb-3 mt-3">--%>
<%--            <form:select class="form-select" id="is-active" path="isActive">--%>
<%--                <option value="true" ${user.isActive ? 'selected' : ''}>Mở khóa</option>--%>
<%--                <option value="false" ${!user.isActive ? 'selected' : ''}>Khóa</option>--%>
<%--            </form:select>--%>
<%--            <label for="is-active">Tình trạng</label>--%>
<%--        </div>--%>
        <div class="form-floating mb-3 mt-3">
            <form:select path="role" cssClass="form-control">
                <form:option value="ROLE_LECTURER" selected="true">Giảng viên</form:option>
            </form:select>
            <label for="role">Vai trò</label>
        </div>
        <button type="submit" class="w-100 btn btn-success mt-3">Thêm mới</button>
    </form:form>
</div>
