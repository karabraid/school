import { format } from "date-fns";

function startUp() {
  resetDefault();
}

function padWithNums(num, width, thing) {
  let s = `` + num;
  while (s.length < width) s = thing + s;
  return s;
}

function countdown() {
  let alarm = document.getElementById(`alarm`);
  alarm.play();
  alarm.pause();

  let datetime = document.getElementById(`input`).value;
  document.getElementById(`clock`).classList.remove(`hidden`);
  let countDownDate = new Date(datetime).getTime();

  let update = function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let millis = Math.floor(distance % 1000);

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
    } else {
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
}

function stopAlarm() {
  let alarm = document.getElementById(`alarm`);
  alarm.pause();
  alarm.currentTime = 0;
  document.getElementById(`stop-button`).classList.add(`hidden`);
  document.getElementById(`expired`).classList.add(`hidden`);
}

function test() {
  let date = new Date();
  let millis = date.getTime();
  let time = new Date(millis + 2000);
  let value = format(time, "yyyy-MM-dd'T'HH:mm:ss");
  document.getElementById(`input`).value = value;
  countdown();
}

function resetDefault() {
  let date = new Date();
  let day = date.getDay();
  let howManyDays = 5 - day;
  if (howManyDays < 0) {
    howManyDays += 7;
  }
  let millis = date.getTime();
  let howManyMillis = howManyDays * 1000 * 60 * 60 * 24;
  let nextFriday = new Date(howManyMillis + millis);
  let value = format(nextFriday, "yyyy-MM-dd'T'17:00:00");
  document.getElementById("input").value = value;
}

window.startUp = startUp;
window.test = test;
window.stopAlarm = stopAlarm;
window.countdown = countdown;
window.resetDefault = resetDefault;
