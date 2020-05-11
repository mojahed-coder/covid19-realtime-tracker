
   
var myArray = [];
     axios.get('https://api.thevirustracker.com/free-api?countryTotals=ALL').then(function (response) {
        var rawData = arrData(response.data.countryitems[0]);
       // myTable(rawData);
       console.log(rawData);
    }).catch(function (error) {
        console.log(error);
    })
    
    function arrData(objData) {
        var arrayData = Object.keys(objData).map(function(key) {
            return objData[key]
        });
        return myArray(arrayData);
    }
    

        function buildTable(data) {
            var table = document.getElementById('myTable');
            for (var i = 0; i < data.length; i++) {
                var row = ` <tr>
                            <th scope="row">${data[i].title}</th>
                            <td>${data[i].total_cases}</td>
                            <td>${data[i].total_deaths}</td>
                            <td>${data[i].total_recovered}</td>
                        </tr>`
                table.innerHTML += row;
            }
        }

        // function myData(data) {
        //     var list = [];

        //     data.forEach(function (item) {
        //         list.push({
        //             country: '<img src="flags/' + item.CountryCode.toLowerCase() + '.svg" width="36"> ' + item.Country, //github.com/rinvex/countries
        //             newcases: '<span style="color: orange; font-weight: bold">+</span>'+item.NewConfirmed,
        //             totalcases: item.TotalConfirmed,
        //             newdeaths: '<span style="color: red; font-weight: bold">+</span>'+item.NewDeaths,
        //             totaldeaths: item.TotalDeaths,
        //             newrecoveries: '<span style="color: green; font-weight: bold">+</span>'+item.NewRecovered,
        //             totalrecoveries: item.TotalRecovered,
        //             //lastupdate: new Date(item.Date).getDate()+'/'+new Date(item.Date).getMonth()+'/'+new Date(item.Date).getFullYear() //.toLocaleString()
        //             lastupdate: formatDate(new Date(item.Date))

        //         });
        //     });
        //     return list;
        //     console.log(new Date.getMonth());
        // }

        // function formatDate(date) {
        //     var year = date.getFullYear().toString();
        //     var month = (date.getMonth() + 101).toString().substring(1);
        //     var day = (date.getDate() + 100).toString().substring(1);
        //     return month + "-" + day + "-" + year;
        // }

        // function myTable(arr) {
        //     var myTable = $('#table').bootstrapTable({
        //         height: 600,
        //         width: 600,
        //         locale: 'en_US',
        //         columns: [
        //             [
        //                 { field: 'country', title: 'Countries', rowspan: 2, align: 'left', valign: 'middle', footerFormatter: countFormatter },
        //                 { title: 'Confirmed infections', colspan: 2, align: 'center', valign: 'middle' },
        //                 { title: 'Confirmed deaths', colspan: 2, align: 'center', valign: 'middle' },
        //                 { title: 'Reported recoveries', colspan: 2, align: 'center', valign: 'middle' },
        //                 { field: 'lastupdate', title: 'Date Last Update', rowspan: 2, align: 'center', valign: 'middle' }
        //             ],
        //             [
        //                 { field: 'newcases', title: 'New Cases', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
        //                 { field: 'totalcases', title: 'Total Cases', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
        //                 { field: 'newdeaths', title: 'New Deaths', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
        //                 { field: 'totaldeaths', title: 'Total Deaths', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
        //                 { field: 'newrecoveries', title: 'New Recovered', sortable: false, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter },
        //                 { field: 'totalrecoveries', title: 'Total Recovered', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
        //             ]
        //         ],
        //         data: arr
        //     });
        //     return myTable;
        // }

        function highestCaseTable(arr) {
            var highestCase = $('#highestCase').bootstrapTable({
                locale: 'en_US',
                columns: [
                    [
                    {field: 'country', title: 'Countries', rowspan: 1, align: 'left'},
                    {title: 'New Cases', field: 'newcases',  sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'totalcases', field: 'totalcases', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
                    ],
                ],
                data: arr
            });
            return highestCase;
        }

        // function highestCaseTable2(arr) {
        //     var listGroup = document.createElement('ul');
        //     listGroup.setAttribute('class', 'list-group-item d-flex');
        //     listGroup.setAttribute('id', 'hconfirmed');
        //    listGroup.textContent = 'njkjkasd';

        //     let output = document.createElement('span');
        //     output.setAttribute('class', 'badge badge-primary badge-pill');


        //     listGroup.setAttribute('id', 'newconfirmed');



        //     let row = table.insertRow();

        //    for (var i=0; i< arr.length; i++) {
        //     var h = [arr[i].country, arr[i].newcases];

        //     listGroup.appendChild(output);
        //     document.querySelector('.container').appendChild(listGroup);
        //    console.log(arr[i].newcases);
        //     listGroup.textContent = arr[i].country;
        //         output
        //     for (var j =0; j < 10; j++ ) {
        //         let cell = row.insertCell();
        //         let text = document.createTextNode(h[j]);
        //         cell.appendChild(text);
        //     }




        //    }

        //  }

        function GetSortOrder(prop) {  
            return function(a, b) {  
                if (a.prop['NewConfirmed'] > b.prop['NewConfirmed']) {  
                    return 1;  
                } else if (a.prop['NewConfirmed'] < b.prop['NewConfirmed']) {  
                    return -1;  
                }  
                return 0;  
            }  
        }  

        function highestDeathsTable(arr) {
            var highestDeath = $('#highestDeath').bootstrapTable({
                locale: 'en_US',
                columns: [
                    [
                    {field: 'country', title: 'Countries', rowspan: 1, align: 'left'},
                    {title: 'New Deaths', field: 'newdeaths',  sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'Total Deaths', field: 'totaldeaths', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
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
                    {title: 'New Recovery', field: 'newrecoveries',  sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter},
                    {title: 'Total Recovery', field: 'totalrecoveries', sortable: true, align: 'right', formatter: numberFormatter, footerFormatter: totalFormatter }
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