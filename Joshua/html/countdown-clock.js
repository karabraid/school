import "../css/countdown-clock-styles.css"

      function startUp() {
        var alarm = document.getElementById(`alarm`);
        var date = new Date();
        var day = date.getDay();
        var howManyDays = 5 - day;
        if (howManyDays < 0) {
          howManyDays+= 7;
        }
        var millis = date.getTime();
        var howManyMillis = howManyDays * 1000 * 60 * 60 * 24;
        var nextFriday = new Date(howManyMillis + millis);
        var value = `${nextFriday.toISOString().split("T")[0]}T17:00`;
        document.getElementById("input").value = value;
      }

      function padWithNums(num, width, thing) {
        var s = ``+num;
        while (s.length < width) s = thing + s;
        return s;
      }

      function countdown() {

        var alarm = document.getElementById(`alarm`);
        alarm.play();
        alarm.pause();

        var datetime = document.getElementById(`input`).value;
        document.getElementById(`clock`).classList.remove(`hidden`);
        var countDownDate = new Date(`${datetime}:00`).getTime();
        
        var update = function () {

          var now = new Date().getTime();
          var distance = countDownDate - now;

          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          var millis = Math.floor(distance % 1000);
          
          document.getElementById(`days`).innerHTML = days;
          document.getElementById(`hours`).innerHTML = hours;
          document.getElementById(`minutes`).innerHTML = minutes;
          document.getElementById(`seconds`).innerHTML = seconds;
          document.getElementById(`millis`).innerHTML = padWithNums(millis, 3, `0`);

          if (distance < 0) {
            document.getElementById(`clock`).classList.add(`hidden`);
            document.getElementById(`expired`).classList.remove(`hidden`);
            document.getElementById(`stop-button`).classList.remove(`hidden`);
            alarm.play();
          }
          else {
            requestAnimationFrame(update);
          }
        }
        requestAnimationFrame(update);
      }

      function stopAlarm() {
        var alarm = document.getElementById(`alarm`);
        alarm.pause();
        alarm.currentTime = 0;
      }

      function test() {
        var date = new Date();
        var millis = date.getTime();
        var time = new Date(millis + 2000);
        var value = time.toISOString();
        document.getElementById(`input`).value = value;
      }
