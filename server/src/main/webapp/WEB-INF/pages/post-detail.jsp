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
    <h1 class="text-center mt-3 mb-3">CHI TIẾT BÀI ĐĂNG</h1>

    <form:form method="get" modelAttribute="post" enctype="multipart/form-data">
        <form:hidden path="id"/>

        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="created-at" path="createdAt" readonly="true"/>
            <label for="created-at">Ngày tạo</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="user-lastname" path="user.lastName" readonly="true"/>
            <label for="user-lastname">Họ và tên đệm</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:input type="text" class="form-control" id="user-firstname" path="user.firstName" readonly="true"/>
            <label for="user-firstname">Tên</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:select path="isLocked" id="is-locked" cssClass="form-control" disabled="true">
                <c:choose>
                    <c:when test="${isLocked == true}">
                        <form:option value="true" selected="true">Đang bị khóa</form:option>
                    </c:when>
                    <c:otherwise>
                        <form:option value="false" selected="true">Không bị khóa</form:option>
                    </c:otherwise>
                </c:choose>
            </form:select>
            <label for="is-locked">Trạng thái bình luận</label>
        </div>
        <div class="form-floating mb-3 mt-3">
            <form:textarea type="text" class="form-control" cssStyle="height: 100px" id="content" path="content"
                           readonly="true"/>
            <label for="content">Nội dung</label>
        </div>
        <p>Danh sách hình ảnh</p>
        <div class="d-flex">
            <c:forEach items="${images}" var="img">
                <div class="mb-3">
                    <img src="${img.url}" style="width: 120px" alt="img-${img.id}"/>
                </div>
            </c:forEach>
        </div>
        <c:url value="/posts" var="listPost"/>
        <a href="${listPost}" class="w-100 btn btn-success">Trở lại</a>
    </form:form>
</div>
