const API_BASE = "http://localhost:8080/api";

export const login = (email, password) =>
  fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
    .then(r => r.json());

export const saveCompany = (data, token) =>
  fetch(`${API_BASE}/onboarding/company`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
