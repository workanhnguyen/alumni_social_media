<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 9/7/2023
  Time: 6:24 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<div class="container-fluid">
    <h1 class="text-center mt-3 mb-3">THỐNG KÊ</h1>
    <div class="d-flex flex-column">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="select-filter">Thống kê theo:</label>
            </div>
            <select class="form-control" id="select-filter">
                <option value="year" selected>Năm</option>
                <option value="month">Tháng</option>
                <option value="quater">Quý</option>
            </select>
        </div>
        <div id="statis-year-period" style="display: flex" class="flex-row justify-content-center align-items-center">
            <div class="d-flex" style="font-size: 30px; cursor: pointer" id="yearPrev" onclick="prev()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/></svg>
            </div>
            <div class="d-flex" style="margin: 0 12px">
                <div class="input-group" style="width: 220px">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="span-from-year">Từ năm:</span>
                    </div>
                    <input type="text" value="2020" class="form-control" id="from-year" aria-describedby="basic-addon3"
                           readonly>
                </div>
                <div class="input-group" style="width: 220px">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="span-to-year">Đến năm</span>
                    </div>
                    <input type="text" value="2025" class="form-control" id="to-year" aria-describedby="basic-addon3"
                           readonly>
                </div>
            </div>
            <div class="d-flex" style="font-size: 30px; cursor: pointer" id="yearNext" onclick="next()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
            </div>
        </div>
        <div id="statis-month" style="display: none" class="flex-row justify-content-center align-items-center">
            <div class="d-flex" style="font-size: 30px; cursor: pointer" onclick="prev()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/></svg>
            </div>

            <div class="d-flex" style="margin: 0 12px">
                <div class="input-group" style="width: 220px">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="year-for-month-label">Chọn năm:</span>
                    </div>
                    <input type="text" value="2023" class="form-control" id="year-for-month" aria-describedby="basic-addon3" />
                </div>
            </div>

            <div class="d-flex" style="font-size: 30px; cursor: pointer" onclick="next()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
            </div>
        </div>

        <div id="statis-quater" style="display: none" class="flex-row justify-content-center align-items-center">
            <select id="quater" class="form-select" style="width: 200px; margin-right: 24px" aria-label="Default select example">
                <option value="1" selected>Quý I</option>
                <option value="2">Quý II</option>
                <option value="3">Quý III</option>
                <option value="4">Quý IV</option>
            </select>

            <div class="d-flex" style="font-size: 30px; cursor: pointer" onclick="prev()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/></svg>
            </div>

            <div class="d-flex" style="margin: 0 12px">
                <div class="input-group" style="width: 220px">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="year-for-quater-label">Chọn năm:</span>
                    </div>
                    <input type="text" value="2023" class="form-control" id="year-for-quater" aria-describedby="basic-addon3" />
                </div>
            </div>

            <div class="d-flex" style="font-size: 30px; cursor: pointer" onclick="next()">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
            </div>
        </div>
        <div class="w-100 d-flex justify-content-center mt-3 mb-3">
            <button class="btn btn-primary" style="width: 120px" onclick="statistic('${authToken}')">Thống kê</button>
        </div>
    </div>
    <div class="d-flex flex-column">
        <h3>Thống kê người dùng:</h3>
        <canvas id="userChart" style="width:100%;max-width:600px"></canvas>
    </div>
    <div class="d-flex flex-column">
        <h3>Thống kê bài đăng:</h3>
        <canvas id="postChart" style="width:100%;max-width:600px"></canvas>
    </div>
</div>
<script src="<c:url value="/js/statistic.js" />"></script>

