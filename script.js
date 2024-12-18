const staffForm = document.getElementById("staff-form");
const staffList = document.getElementById("staff-list");
const exportBtn = document.getElementById("export-btn");
const importFile = document.getElementById("import-file");

let staffData = [];

// Adiciona um novo membro ao array de staff
staffForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newStaff = {
    name: document.getElementById("name").value || "Não informado",
    role: document.getElementById("role").value || "Não informado",
    phone: document.getElementById("phone").value || "Não informado",
    email: document.getElementById("email").value || "Não informado",
    address: document.getElementById("address").value || "Não informado",
  };

  staffData.push(newStaff);
  renderStaffList();
  staffForm.reset();
});

// Renderiza a lista de staff
function renderStaffList() {
  staffList.innerHTML = staffData.map((staff, index) => `
    <li>
      <div class="info">
        <span>Nome:</span> ${staff.name}<br>
        <span>Cargo:</span> ${staff.role}<br>
        <span>Telefone:</span> ${staff.phone}<br>
        <span>Email:</span> ${staff.email}<br>
        <span>Endereço:</span> ${staff.address}
      </div>
      <div class="actions">
        <button class="edit-btn" onclick="editStaff(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteStaff(${index})">Excluir</button>
      </div>
    </li>
  `).join("");
}

// Edita um membro da lista
function editStaff(index) {
  const staff = staffData[index];
  document.getElementById("name").value = staff.name !== "Não informado" ? staff.name : "";
  document.getElementById("role").value = staff.role !== "Não informado" ? staff.role : "";
  document.getElementById("phone").value = staff.phone !== "Não informado" ? staff.phone : "";
  document.getElementById("email").value = staff.email !== "Não informado" ? staff.email : "";
  document.getElementById("address").value = staff.address !== "Não informado" ? staff.address : "";

  deleteStaff(index);
}

// Exclui um membro da lista
function deleteStaff(index) {
  staffData.splice(index, 1);
  renderStaffList();
}

// Exporta os dados para um arquivo JSON
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(staffData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "staff_data.json";
  link.click();
});

// Importa dados de um arquivo JSON
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      staffData = JSON.parse(event.target.result);
      renderStaffList();
    };
    reader.readAsText(file);
  }
});