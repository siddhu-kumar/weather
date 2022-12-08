    var currtime = document.getElementById("date-time");
    let weathercon =document.getElementById("sun");

    const tempStatus = "clouds";
    const getCurrentDay = () => {
        var weekname = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

        let currentTime = new Date();
        let day = currentTime.getDay();
        console.log(weekname[day]);
    
        let date = currentTime.getDate();
        let month = currentTime.getMonth();

        let hour = currentTime.getHours();
        let min = currentTime.getMinutes();

        var mid_day;
        if(hour>=12) 
            mid_day = 'PM';
        else 
            mid_day = 'AM';

        if(hour>11) {
            hour -= 12;
        }
        if(min<10) {
            min = "0" + min;
        }
        if(date<10) {
            date = "0" + date;
        }
        if(hour<10) {
            hour = "0" + hour;
        }
        
        currtime.innerHTML = weekname[day] + " | " +  monthname[month] + " " + date + " | " + hour + ":" + min + " " + mid_day;
    }
    getCurrentDay();
