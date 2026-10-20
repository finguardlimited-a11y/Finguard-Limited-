const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const ugx = new Intl.NumberFormat("en-UG", {style:"currency",currency:"UGX",maximumFractionDigits:0});
function calculate() {
  const target = Math.max(0, Number(document.getElementById("target").value) || 0);
  const saved = Math.max(0, Number(document.getElementById("saved").value) || 0);
  const months = Math.max(1, Math.floor(Number(document.getElementById("months").value) || 1));
  const remaining = Math.max(0, target - saved);
  document.getElementById("monthlyResult").textContent = ugx.format(Math.ceil(remaining / months));
  document.getElementById("calcNote").textContent = remaining === 0
    ? "Your entered savings meet or exceed the target. This is a planning estimate only."
    : "Estimate assumes no investment returns and excludes fees, taxes and risk.";
}
["target","saved","months"].forEach(id => document.getElementById(id).addEventListener("input", calculate));
calculate();

document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("message").value.trim();
  const body = `Hello Finguard Limited,\nMy name is ${name}.\nMy phone number is ${phone}.\nI am enquiring about: ${interest}.\nMessage: ${message}`;
  const url = "https://wa.me/256760165419?text=" + encodeURIComponent(body);
  window.open(url, "_blank", "noopener");
});
document.getElementById("year").textContent = new Date().getFullYear();
