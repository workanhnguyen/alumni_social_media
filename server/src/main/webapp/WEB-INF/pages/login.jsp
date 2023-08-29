<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 8/29/2023
  Time: 5:05 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<section>
    <c:url value="/login" var="action" />
    <form method="post" action="${action}">
        <div class="form-floating mb-3 mt-3">
            <input type="text" class="form-control" id="username" placeholder="Tên đăng nhập..." name="username">
            <label for="username">Tên đăng nhập</label>
        </div>

        <div class="form-floating mt-3 mb-3">
            <input type="text" class="form-control" id="pwd" placeholder="Mật khẩu..." name="password">
            <label for="pwd">Mật khẩu</label>
        </div>

        <div class="form-floating mt-3 mb-3">
            <input type="submit" value="Đăng nhập" class="btn btn-danger" />
        </div>
    </form>
</section>
