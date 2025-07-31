
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const s = document.getElementById("countdown-widget-script");
    if (!s) return;

    const title = s.getAttribute("data-title") || "⏳ Upcoming Event";
    const timeStr = s.getAttribute("data-time");
    const position = s.getAttribute("data-position") || "right";

    if (!timeStr) {
      console.error("Countdown Widget: Missing data-time attribute.");
      return;
    }

    const endTime = new Date(timeStr);
    if (isNaN(endTime)) {
      console.error("Countdown Widget: Invalid date format.");
      return;
    }

    const w = document.createElement("div");
    w.id = "countdown-widget";
    w.style.cssText = `
      position: fixed;
      ${position === "center" ? "top: 50%; left: 50%; transform: translate(-50%, -50%);" : `bottom: 20px; ${position}: 20px;`}
      width: 300px;
      padding: 16px;
      background: #e3f2fd;
      border: 1px solid #90caf9;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      font-family: 'Segoe UI', sans-serif;
      color: #0d47a1;
      z-index: 99999;
      text-align: center;
    `;

    w.innerHTML = `
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${title}</div>
      <div id="countdown-timer" style="font-size: 18px; font-weight: 600;">Loading...</div>
    `;

    document.body.appendChild(w);

    const timerDisplay = w.querySelector("#countdown-timer");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance <= 0) {
        timerDisplay.innerHTML = "🎉 It's time!";
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerDisplay.innerHTML = `
        ${days}d ${hours}h ${minutes}m ${seconds}s
      `;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  });
})();
