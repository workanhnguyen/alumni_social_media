function prev() {
    const filterDOM = document.getElementById("select-filter");

    if (filterDOM.value === 'year') {
        const fromYearDOM = document.getElementById("from-year");
        const toYearDOM = document.getElementById("to-year");

        fromYearDOM.value = (parseInt(fromYearDOM.value) - 5).toString();
        toYearDOM.value = (parseInt(toYearDOM.value) - 5).toString();
    } else if (filterDOM.value === 'month') {
        const yearForMonthDOM = document.getElementById("year-for-month");

        yearForMonthDOM.value = (parseInt(yearForMonthDOM.value) - 1).toString();
    } else if (filterDOM.value === 'quater') {
        const yearForQuater = document.getElementById("year-for-quater");

        yearForQuater.value = (parseInt(yearForQuater.value) - 1).toString();
    }
}
function next() {
    const filterDOM = document.getElementById("select-filter");

    if (filterDOM.value === 'year') {
        const fromYearDOM = document.getElementById("from-year");
        const toYearDOM = document.getElementById("to-year");

        fromYearDOM.value = (parseInt(fromYearDOM.value) + 5).toString();
        toYearDOM.value = (parseInt(toYearDOM.value) + 5).toString();
    } else if (filterDOM.value === 'month') {
        const yearForMonthDOM = document.getElementById("year-for-month");

        yearForMonthDOM.value = (parseInt(yearForMonthDOM.value) + 1).toString();
    } else if (filterDOM.value === 'quater') {
        const yearForQuater = document.getElementById("year-for-quater");

        yearForQuater.value = (parseInt(yearForQuater.value) + 1).toString();
    }
}
function changeFilter () {
    const filterDOM = document.getElementById("select-filter");
    const statsYearPeriodDOM = document.getElementById("statis-year-period");
    const statsMonthDOM = document.getElementById("statis-month");
    const statsQuaterDOM = document.getElementById("statis-quater");

    filterDOM.addEventListener("change", function () {
        switch (filterDOM.value) {
            case 'year':
                statsYearPeriodDOM.style.display = 'flex';
                statsMonthDOM.style.display = 'none';
                statsQuaterDOM.style.display = 'none';
                break;
            case 'month':
                statsYearPeriodDOM.style.display = 'none';
                statsMonthDOM.style.display = 'flex';
                statsQuaterDOM.style.display = 'none';
                break;
            case 'quater':
                statsYearPeriodDOM.style.display = 'none';
                statsMonthDOM.style.display = 'none';
                statsQuaterDOM.style.display = 'flex';
                break;
            default:
                break;
        }
    })
}
function statistic(authToken) {
    const filterDOM = document.getElementById("select-filter");

        if (filterDOM.value === 'year') {

            const fromYearDOM = document.getElementById("from-year");
            const toYearDOM = document.getElementById("to-year");

            let barColors = ["red", "green", "blue", "orange", "brown"];

            fetch(`/server/api/stats/users/${fromYearDOM.value}/to/${toYearDOM.value}`, {
                method: "get", headers: {
                    "Authorization": authToken, "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    let userChartTitle = [];
                    let userChartValue = [];

                    for (var i = 0; i < data.length; i++) {
                        userChartTitle[i] = data[i].year;
                        userChartValue[i] = data[i].quantityOfUser
                    }
                    new Chart("userChart", {
                        type: "bar", data: {
                            labels: userChartTitle, datasets: [{
                                backgroundColor: barColors, data: userChartValue
                            }]
                        }, options: {
                            legend: {display: false}, title: {
                                display: true,
                                text: `Số lượng người dùng đăng ký từ năm ${fromYearDOM.value} đến năm ${toYearDOM.value}`
                            }
                        }
                    });
                })

            fetch(`/server/api/stats/posts/${fromYearDOM.value}/to/${toYearDOM.value}`, {
                method: "get", headers: {
                    "Authorization": authToken, "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    let postChartTitle = [];
                    let postChartValue = [];

                    for (var i = 0; i < data.length; i++) {
                        postChartTitle[i] = data[i].year;
                        postChartValue[i] = data[i].quantityOfPost
                    }
                    new Chart("postChart", {
                        type: "bar", data: {
                            labels: postChartTitle, datasets: [{
                                backgroundColor: barColors, data: postChartValue
                            }]
                        }, options: {
                            legend: {display: false}, title: {
                                display: true,
                                text: `Số lượng bài đăng từ năm ${fromYearDOM.value} đến năm ${toYearDOM.value}`
                            }
                        }
                    });
                })
        } else if (filterDOM.value === 'month') {

            const yearForMonth = document.getElementById("year-for-month");

            let barColors = ["red", "green", "blue", "orange", "brown", "red", "green", "blue", "orange", "brown", "red", "green"];

            fetch(`/server/api/stats/users/${yearForMonth.value}`, {
                method: "get", headers: {
                    "Authorization": authToken, "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    let userChartTitle = [];
                    let userChartValue = [];

                    for (var i = 0; i < data.length; i++) {
                        userChartTitle[i] = data[i].month;
                        userChartValue[i] = data[i].quantityOfUser
                    }
                    new Chart("userChart", {
                        type: "bar", data: {
                            labels: userChartTitle, datasets: [{
                                backgroundColor: barColors, data: userChartValue
                            }]
                        }, options: {
                            legend: {display: false}, title: {
                                display: true,
                                text: `Số lượng người dùng đăng ký trong năm ${yearForMonth.value}`
                            }
                        }
                    });
                })

            fetch(`/server/api/stats/posts/${yearForMonth.value}`, {
                method: "get", headers: {
                    "Authorization": authToken, "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    let postChartTitle = [];
                    let postChartValue = [];

                    for (var i = 0; i < data.length; i++) {
                        postChartTitle[i] = data[i].month;
                        postChartValue[i] = data[i].quantityOfPost
                    }
                    new Chart("postChart", {
                        type: "bar", data: {
                            labels: postChartTitle, datasets: [{
                                backgroundColor: barColors, data: postChartValue
                            }]
                        }, options: {
                            legend: {display: false}, title: {
                                display: true,
                                text: `Số lượng bài đăng trong năm ${yearForMonth.value}`
                            }
                        }
                    });
                })
        } else if (filterDOM.value === 'quater') {
            console.log('quater');
        }
}

changeFilter();