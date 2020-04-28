fetch('https://api.covid19api.com/summary').then((response)=>response.json())
        .then((data)=> {
            var rawData = myData(data.Countries);
            myTable(rawData);
            highestCaseTable(rawData.slice(0,10));
            highestDeathsTable(rawData.slice(0,10));
            highestRecoveryTable(rawData.slice(0,10));
            

            document.querySelector("#confirmed").append(formatNumber(data.Global.TotalConfirmed));
            document.querySelector("#recovered").append(formatNumber(data.Global.TotalRecovered));
            document.querySelector("#deceased").append(formatNumber(data.Global.TotalDeaths));

            document.querySelector("#newConfirmed").append(formatNumber(data.Global.NewConfirmed));
            document.querySelector("#newRecovered").append(formatNumber(data.Global.NewRecovered));
            document.querySelector("#newDeceased").append(formatNumber(data.Global.NewDeaths));
           // console.log(error);
        }).catch((err)=>{
            console.log(err);
        }); 

        function myData(data) {
            var list = [];

            data.forEach(function (item) {
                list.push({
                    country: '<img src="flags/' + item.CountryCode.toLowerCase() + '.svg" width="36"> ' + item.Country, //github.com/rinvex/countries
                    newcases: item.NewConfirmed,
                    totalcases: item.TotalConfirmed,
                    newdeaths: item.NewDeaths,
                    totaldeaths: item.TotalDeaths,
                    newrecoveries: item.NewRecovered,
                    totalrecoveries: item.TotalRecovered,
                    //lastupdate: new Date(item.Date).getDate()+'/'+new Date(item.Date).getMonth()+'/'+new Date(item.Date).getFullYear() //.toLocaleString()
                    lastupdate: formatDate(new Date(item.Date))

                });
            });
            return list;
            console.log(new Date.getMonth());
        }

        function formatDate(date) {
            var year = date.getFullYear().toString();
            var month = (date.getMonth() + 101).toString().substring(1);
            var day = (date.getDate() + 100).toString().substring(1);
            return month + "-" + day + "-" + year;
        }

        function myTable(arr) {
            var myTable = $('#table').bootstrapTable({
                height: 600,
                width: 600,
                locale: 'en_US',
                columns: [
                    [
                        { field: 'country', title: 'Countries', rowspan: 2, align: 'left', valign: 'middle', footerFormatter: countFormatter },
                        { title: 'Confirmed infections', colspan: 2, align: 'center', valign: 'middle' },
                        { title: 'Confirmed deaths', colspan: 2, align: 'center', valign: 'middle' },
                        { title: 'Reported recoveries', colspan: 2, align: 'center', valign: 'middle' },
                        { field: 'lastupdate', title: 'Date Last Update', rowspan: 2, align: 'center', valign: 'middle' }
                    ],
                    [
                        { field: 'newcases', title: 'New Cases', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
                        { field: 'totalcases', title: 'Total Cases', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
                        { field: 'newdeaths', title: 'New Deaths', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
                        { field: 'totaldeaths', title: 'Total Deaths', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
                        { field: 'newrecoveries', title: 'New Recovered', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
                        { field: 'totalrecoveries', title: 'Total Recovered', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
                    ]
                ],
                data: arr
            });
            return myTable;
        }

        function highestCaseTable(arr) {
            var highestCase = $('#highestCase').bootstrapTable({
                locale: 'en_US',
                columns: [
                    [
                    {field: 'country', title: 'Countries', rowspan: 1, align: 'left'},
                    {title: 'New Cases', field: 'newcases',  sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'totalcases', field: 'totalcases', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
                    ],
                ],
                data: arr
            });
            return highestCase;
        }

        function highestDeathsTable(arr) {
            var highestDeath = $('#highestDeath').bootstrapTable({
                locale: 'en_US',
                columns: [
                    [
                    {field: 'country', title: 'Countries', rowspan: 1, align: 'left'},
                    {title: 'New Deaths', field: 'newdeaths',  sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'Total Deaths', field: 'totaldeaths', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
                    ],
                ],
                data: arr
            });
            return highestCase;
        }

        function highestRecoveryTable(arr) {
            var highestRec = $('#highestRecovery').bootstrapTable({
                locale: 'en_US',
                columns: [
                    [
                    {field: 'country', title: 'Countries', rowspan: 1, align: 'left'},
                    {title: 'New Recovery', field: 'newrecoveries',  sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'Total Recovery', field: 'totalrecoveries', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
                    ],
                ],
                data: arr
            });
            return highestCase;
        }

        function countFormatter(data) {
            return data.length
        }

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        function numberFormatter(value, row) {
            return value.toLocaleString('en-US');
        }

        function totalFormatter(data) {
            var field = this.field
            var total = data.map(function (row) {
                return row[field]
            }).reduce(function (sum, i) {
                return sum + i
            }, 0);
            return total.toLocaleString('en-US');
        }