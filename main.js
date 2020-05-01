fetch('https://api.covid19api.com/summary').then((response)=>response.json())
        .then((data)=> {
            var rawData = myData(data.Countries);
            myTable(rawData);
            highestCaseTable(rawData.slice(0,10));
            highestDeathsTable(rawData.slice(0,10));
            highestRecoveryTable(rawData.slice(0,10));

            // var hConfirmed = rawData.sort(function(obj1, obj2){
            //     return obj2.newcases - obj1.newcases;
            // });
            // console.log(hConfirmed);
            // highestCaseTable2(hConfirmed);

          // console.log(data.Countries[0].Country);
         /* data.Countries.forEach((item)=>{
            console.log(item.Country);
          });*/
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
                    newcases: '<span style="color: orange; font-weight: bold">+</span>'+item.NewConfirmed,
                    totalcases: item.TotalConfirmed,
                    newdeaths: '<span style="color: red; font-weight: bold">+</span>'+item.NewDeaths,
                    totaldeaths: item.TotalDeaths,
                    newrecoveries: '<span style="color: green; font-weight: bold">+</span>'+item.NewRecovered,
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