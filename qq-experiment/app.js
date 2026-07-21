const STORAGE_KEY = "invoiceMaker.qqExperiment.v1";

const defaultState = {
  sellerName: "",
  sellerAbn: "",
  sellerAddress: "",
  sellerEmail: "",
  sellerPhone: "",
  clientName: "",
  clientAbn: "",
  clientAddress: "",
  invoiceNumber: "INV-001",
  issuedDate: todayIso(),
  termsDays: "7",
  workSite: "",
  accountName: "",
  bsb: "",
  accountNumber: "",
  language: "zh",
  notes: "Thanks for your business!",
  items: [
    {
      description: "",
      date: todayIso(),
      hours: "",
      rate: "",
    },
  ],
};

let state = loadState();

const fields = [
  "sellerName",
  "sellerAbn",
  "sellerAddress",
  "sellerEmail",
  "sellerPhone",
  "clientName",
  "clientAbn",
  "clientAddress",
  "invoiceNumber",
  "issuedDate",
  "termsDays",
  "workSite",
  "accountName",
  "bsb",
  "accountNumber",
  "notes",
];

const itemList = document.querySelector("#itemList");
const saveStatus = document.querySelector("#saveStatus");
const verificationPanel = document.querySelector("#verificationPanel");

const translations = {
  en: {
    appName: "QQ Invoice 2008 · Experimental",
    heading: "Invoice Assistant",
    saveButton: "Save",
    printButton: "Print",
    printTitle: "Print / Save PDF",
    saved: "Saved in this browser.",
    savedAuto: "Auto-saved.",
    savedManual: "Saved.",
    loaded: "Loaded. You can edit now.",
    languageSaved: "Language updated.",
    newInvoiceSaved: "New invoice created. Your profile and payment details were kept.",
    nextInvoiceSaved: "Next invoice created from the previous pay period.",
    importSaved: "Imported and saved.",
    importFailed: "Import failed: the JSON file is not valid.",
    detailsTab: "Details",
    itemsTab: "Items",
    paymentTab: "Payment",
    sellerName: "Your name",
    sellerAbn: "Your ABN",
    sellerAddress: "Your address",
    sellerEmail: "Email",
    sellerPhone: "Phone",
    clientName: "Bill to",
    clientAbn: "Client ABN",
    clientAddress: "Client address",
    invoiceNumber: "Invoice no.",
    issuedDate: "Issued date",
    termsDays: "Terms days",
    workSite: "Work site",
    itemsHeading: "Work items",
    itemsHelp: "Hours and Rate support maths, for example ",
    addRow: "Add row",
    accountName: "Account name",
    bsb: "BSB",
    accountNumber: "Account number",
    notes: "Notes",
    newInvoice: "Next invoice",
    exportData: "Export data",
    importData: "Import data",
    row: "Row",
    removeRow: "Remove row",
    description: "Description",
    date: "Date",
    hoursQty: "Hours / Qty",
    hourlyRate: "Hourly rate",
    lineTotal: "Line total",
    invoice: "Invoice",
    numberPrefix: "No.",
    billTo: "Bill To",
    issued: "Issued:",
    terms: "Terms:",
    due: "Due:",
    total: "Total:",
    quantity: "Quantity",
    price: "Price",
    paymentDetails: "Payment details:",
    payWithin: "Please pay within {days} days to:",
    accountNamePreview: "Account Name:",
    accountNumberPreview: "Account Number:",
    reference: "Reference:",
    days: "days",
    hoursUnit: "Hours",
    abnValid: "ABN valid",
    abnInvalid: "ABN must be 11 digits and pass checksum",
    bsbValid: "BSB format valid",
    bsbInvalid: "BSB should be 6 digits, like 123-456",
    nextInvoiceEyebrow: "Next pay period",
    nextInvoiceTitle: "Create next invoice",
    nextInvoiceSummary: "Next period: {start} to {end}. Weekdays are included automatically; choose weekend days only if you worked.",
    nextDescription: "Description",
    nextRate: "Hourly rate",
    nextHours: "Hours per day",
    workedSaturday: "Worked Saturday",
    workedSunday: "Worked Sunday",
    cancel: "Cancel",
    createInvoice: "Create invoice",
    close: "Close",
    verificationTitle: "Information check",
    checkSellerAbn: "Your ABN matches the ABN checksum. Verify the name and status with official ABN Lookup.",
    checkClientAbn: "Client ABN matches the ABN checksum. Verify the name and status with official ABN Lookup.",
    checkBsb: "BSB format is valid. Confirm the branch with your bank or a public BSB lookup.",
    checkAccountName: "Account name is filled in.",
    checkAccount: "Account number format looks valid and is grouped correctly. Account ownership cannot be publicly verified.",
    checkSellerAddress: "Your address looks complete.",
    checkClientAddress: "Client address is filled in.",
    checkEmail: "Email format is valid.",
    missingSellerAbn: "Your ABN needs checking.",
    missingClientAbn: "Client ABN needs checking.",
    missingBsb: "BSB needs checking.",
    missingAccountName: "Account name needs checking.",
    missingAccount: "Account number needs checking.",
    missingSellerAddress: "Your address needs checking.",
    missingClientAddress: "Client address needs checking.",
    missingEmail: "Email needs checking.",
    confirmCreateWithWarnings: "Some information still needs checking. Create the next invoice anyway?",
  },
  zh: {
    appName: "QQ Invoice 2008 · 实验版",
    heading: "发票小助手",
    saveButton: "保存",
    printButton: "打印",
    printTitle: "打印 / 保存 PDF",
    saved: "已保存到本机浏览器。",
    savedAuto: "已自动保存。",
    savedManual: "已手动保存。",
    loaded: "已载入，可直接编辑。",
    languageSaved: "语言已切换。",
    newInvoiceSaved: "已创建新发票，个人和付款信息已保留。",
    nextInvoiceSaved: "已根据上一期工期生成新的发票。",
    importSaved: "导入完成并已保存。",
    importFailed: "导入失败：JSON 文件格式不正确。",
    detailsTab: "资料",
    itemsTab: "项目",
    paymentTab: "付款",
    sellerName: "你的名字",
    sellerAbn: "你的 ABN",
    sellerAddress: "你的地址",
    sellerEmail: "邮箱",
    sellerPhone: "电话",
    clientName: "收款对象",
    clientAbn: "客户 ABN",
    clientAddress: "客户地址",
    invoiceNumber: "发票编号",
    issuedDate: "开票日期",
    termsDays: "付款天数",
    workSite: "工作地址",
    itemsHeading: "工作项目",
    itemsHelp: "Hours 和 Rate 支持数学运算，例如 ",
    addRow: "添加一行",
    accountName: "账户名",
    bsb: "BSB",
    accountNumber: "账号",
    notes: "备注",
    newInvoice: "制作下一期发票",
    exportData: "导出数据",
    importData: "导入数据",
    row: "第",
    removeRow: "删除这一行",
    description: "描述",
    date: "日期",
    hoursQty: "小时 / 数量",
    hourlyRate: "时薪",
    lineTotal: "本行金额",
    invoice: "Invoice",
    numberPrefix: "No.",
    billTo: "Bill To",
    issued: "Issued:",
    terms: "Terms:",
    due: "Due:",
    total: "Total:",
    quantity: "Quantity",
    price: "Price",
    paymentDetails: "Payment details:",
    payWithin: "Please pay within {days} days to:",
    accountNamePreview: "Account Name:",
    accountNumberPreview: "Account Number:",
    reference: "Reference:",
    days: "days",
    hoursUnit: "Hours",
    abnValid: "ABN 有效",
    abnInvalid: "ABN 需要 11 位数字，并通过校验",
    bsbValid: "BSB 格式有效",
    bsbInvalid: "BSB 应为 6 位数字，例如 123-456",
    nextInvoiceEyebrow: "下一期工期",
    nextInvoiceTitle: "制作下一期发票",
    nextInvoiceSummary: "下一期：{start} 到 {end}。周一到周五会自动加入；周末只有上班才勾选。",
    nextDescription: "描述",
    nextRate: "时薪",
    nextHours: "每天小时",
    workedSaturday: "周六上班",
    workedSunday: "周日上班",
    cancel: "取消",
    createInvoice: "生成发票",
    close: "关闭",
    verificationTitle: "信息核实",
    checkSellerAbn: "你的 ABN 通过格式校验。名称和状态请再用官方 ABN Lookup 核实。",
    checkClientAbn: "对方 ABN 通过格式校验。名称和状态请再用官方 ABN Lookup 核实。",
    checkBsb: "BSB 格式正确。银行分行请再用银行 App 或公开 BSB 查询核实。",
    checkAccountName: "账户名已填写。",
    checkAccount: "银行账号格式正确，已按四位分组。账号归属无法公开核实，需要以你银行 App 为准。",
    checkSellerAddress: "你的地址看起来完整。",
    checkClientAddress: "对方地址已填写。",
    checkEmail: "邮箱格式正确。",
    missingSellerAbn: "你的 ABN 需要检查。",
    missingClientAbn: "对方 ABN 需要检查。",
    missingBsb: "BSB 需要检查。",
    missingAccountName: "账户名需要检查。",
    missingAccount: "银行账号需要检查。",
    missingSellerAddress: "你的地址需要检查。",
    missingClientAddress: "对方地址需要检查。",
    missingEmail: "邮箱需要检查。",
    confirmCreateWithWarnings: "还有信息需要核实，仍然生成下一期发票吗？",
  },
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(message = t("saved")) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveStatus.textContent = message;
}

function bindForm() {
  fields.forEach((field) => {
    const element = document.querySelector(`#${field}`);
    element.value = getFieldDisplayValue(field);
    element.addEventListener("input", () => {
      state[field] = element.value;
      if (field === "issuedDate" || field === "termsDays") {
        syncDueDate();
      }
      update();
    });

    if (field === "accountNumber") {
      element.addEventListener("blur", () => {
        state.accountNumber = formatAccountNumber(element.value);
        element.value = state.accountNumber;
        update();
      });
    }
  });

  document.querySelector("#addItemButton").addEventListener("click", () => {
    state.items.push({
      description: "Construction labour",
      date: todayIso(),
      hours: "",
      rate: "",
    });
    renderItems();
    update();
  });

  document.querySelector("#saveButton").addEventListener("click", () => {
    saveState(t("savedManual"));
  });

  document.querySelector("#printButton").addEventListener("click", () => {
    window.print();
  });

  document.querySelector("#newInvoiceTopButton").addEventListener("click", () => {
    openNextInvoiceModal();
  });

  document.querySelector("#newInvoiceButton").addEventListener("click", () => {
    openNextInvoiceModal();
  });

  document.querySelector("#closeNextInvoiceModal").addEventListener("click", closeNextInvoiceModal);
  document.querySelector("#cancelNextInvoice").addEventListener("click", closeNextInvoiceModal);
  document.querySelector("#createNextInvoice").addEventListener("click", createNextInvoiceFromModal);
  document.querySelector("#nextInvoiceModal").addEventListener("click", (event) => {
    if (event.target.id === "nextInvoiceModal") {
      closeNextInvoiceModal();
    }
  });

  document.querySelector("#exportButton").addEventListener("click", exportData);
  document.querySelector("#importInput").addEventListener("change", importData);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  document.querySelectorAll("[data-qq-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      switchTab(button.dataset.qqTab);
      document.querySelector(".editor-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-qq-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetByAction = {
        next: "#newInvoiceTopButton",
        save: "#saveButton",
        print: "#printButton",
      };
      document.querySelector(targetByAction[button.dataset.qqAction])?.click();
    });
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      applyLanguage();
      renderItems();
      update(t("languageSaved"));
    });
  });
}

function writeStateToForm() {
  fields.forEach((field) => {
    document.querySelector(`#${field}`).value = getFieldDisplayValue(field);
  });
}

function getFieldDisplayValue(field) {
  if (field === "accountNumber") {
    return formatAccountNumber(state[field]);
  }
  return state[field] ?? "";
}

function switchTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function currentLanguage() {
  return state.language === "en" ? "en" : "zh";
}

function t(key) {
  return translations[currentLanguage()][key] || translations.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage() === "zh" ? "zh-CN" : "en";
  document.title = t("heading");

  document.querySelector(".eyebrow").textContent = t("appName");
  document.querySelector("h1").textContent = t("heading");
  document.querySelector("#saveButton").textContent = t("saveButton");
  document.querySelector("#printButton").textContent = t("printButton");
  document.querySelector("#printButton").title = t("printTitle");
  document.querySelector("#newInvoiceTopButton").textContent = t("newInvoice");
  document.querySelector('[data-tab="details"]').textContent = t("detailsTab");
  document.querySelector('[data-tab="items"]').textContent = t("itemsTab");
  document.querySelector('[data-tab="payment"]').textContent = t("paymentTab");

  setLabelText("sellerName", t("sellerName"));
  setLabelText("sellerAbn", t("sellerAbn"));
  setLabelText("sellerAddress", t("sellerAddress"));
  setLabelText("sellerEmail", t("sellerEmail"));
  setLabelText("sellerPhone", t("sellerPhone"));
  setLabelText("clientName", t("clientName"));
  setLabelText("clientAbn", t("clientAbn"));
  setLabelText("clientAddress", t("clientAddress"));
  setLabelText("invoiceNumber", t("invoiceNumber"));
  setLabelText("issuedDate", t("issuedDate"));
  setLabelText("termsDays", t("termsDays"));
  setLabelText("workSite", t("workSite"));
  setLabelText("accountName", t("accountName"));
  setLabelText("bsb", t("bsb"));
  setLabelText("accountNumber", t("accountNumber"));
  setLabelText("notes", t("notes"));

  document.querySelector(".items-toolbar h2").textContent = t("itemsHeading");
  document.querySelector(".items-toolbar p").innerHTML = `${t("itemsHelp")}<code>4.5+4.5</code>。`;
  document.querySelector("#addItemButton").textContent = t("addRow");
  document.querySelector("#newInvoiceButton").textContent = t("newInvoice");
  document.querySelector("#exportButton").textContent = t("exportData");
  setLabelPlainText(document.querySelector(".file-button"), t("importData"));

  document.querySelector(".invoice-title h2").textContent = t("invoice");
  document.querySelector(".bill-summary strong").textContent = t("billTo");
  setOrderedText(".bill-summary dt", [t("issued"), t("terms"), t("due"), t("total")]);
  setOrderedText(".invoice-table th", [t("description"), t("quantity"), t("price"), t("total")]);
  document.querySelector(".totals dt").textContent = t("total");
  document.querySelector(".payment-details strong").textContent = t("paymentDetails");
  document.querySelector("#nextInvoiceEyebrow").textContent = t("nextInvoiceEyebrow");
  document.querySelector("#nextInvoiceTitle").textContent = t("nextInvoiceTitle");
  document.querySelector("#closeNextInvoiceModal").title = t("close");
  setLabelText("nextDescription", t("nextDescription"));
  setLabelText("nextRate", t("nextRate"));
  setLabelText("nextHours", t("nextHours"));
  document.querySelector("#nextWorkSaturday").nextElementSibling.textContent = t("workedSaturday");
  document.querySelector("#nextWorkSunday").nextElementSibling.textContent = t("workedSunday");
  document.querySelector("#cancelNextInvoice").textContent = t("cancel");
  document.querySelector("#createNextInvoice").textContent = t("createInvoice");

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage());
  });
}

function setLabelText(inputId, text) {
  const label = document.querySelector(`#${inputId}`)?.closest("label");
  if (!label) return;
  setLabelPlainText(label, text);
}

function setLabelPlainText(label, text) {
  const node = Array.from(label.childNodes).find((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
  if (node) {
    node.textContent = `\n                ${text}\n                `;
  }
}

function setOrderedText(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.textContent = values[index] || element.textContent;
  });
}

function openNextInvoiceModal() {
  const period = getNextPayPeriod();
  const defaults = getItemDefaults();
  document.querySelector("#nextInvoiceSummary").textContent = t("nextInvoiceSummary")
    .replace("{start}", formatDate(period.start))
    .replace("{end}", formatDate(period.end));
  document.querySelector("#nextDescription").value = defaults.description;
  document.querySelector("#nextRate").value = defaults.rate;
  document.querySelector("#nextHours").value = defaults.hours;
  document.querySelector("#nextWorkSaturday").checked = false;
  document.querySelector("#nextWorkSunday").checked = false;
  document.querySelector("#nextInvoiceModal").hidden = false;
  document.querySelector("#nextDescription").focus();
}

function closeNextInvoiceModal() {
  document.querySelector("#nextInvoiceModal").hidden = true;
}

function createNextInvoiceFromModal() {
  if (getVerificationChecks().some((check) => !check.valid) && !window.confirm(t("confirmCreateWithWarnings"))) {
    return;
  }

  const period = getNextPayPeriod();
  const description = document.querySelector("#nextDescription").value.trim() || "Construction labour";
  const hours = document.querySelector("#nextHours").value.trim() || "9";
  const rate = document.querySelector("#nextRate").value.trim() || "28";
  const includeSaturday = document.querySelector("#nextWorkSaturday").checked;
  const includeSunday = document.querySelector("#nextWorkSunday").checked;

  state.invoiceNumber = nextInvoiceNumber(state.invoiceNumber);
  state.issuedDate = period.end;
  state.items = getPayPeriodDates(period.start, includeSaturday, includeSunday).map((date) => ({
    description,
    date,
    hours,
    rate,
  }));

  writeStateToForm();
  renderItems();
  switchTab("items");
  closeNextInvoiceModal();
  update(t("nextInvoiceSaved"));
}

function getNextPayPeriod() {
  const lastDate = getLastItemDate();
  const startDate = lastDate ? addDays(parseLocalDate(lastDate), 1) : getCurrentPayPeriodStart();
  const alignedStart = alignToWednesday(startDate);
  const endDate = addDays(alignedStart, 6);
  return {
    start: toIsoDate(alignedStart),
    end: toIsoDate(endDate),
  };
}

function getCurrentPayPeriodStart() {
  return alignToWednesday(new Date());
}

function alignToWednesday(date) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  while (result.getDay() !== 3) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

function getLastItemDate() {
  const dates = state.items
    .map((item) => item.date)
    .filter(Boolean)
    .sort();
  return dates.at(-1) || "";
}

function getItemDefaults() {
  const lastItem = [...state.items].reverse().find((item) => item.description || item.hours || item.rate) || {};
  return {
    description: lastItem.description || "Construction labour",
    hours: lastItem.hours || "9",
    rate: lastItem.rate || "28",
  };
}

function getPayPeriodDates(startIso, includeSaturday, includeSunday) {
  const start = parseLocalDate(startIso);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index))
    .filter((date) => {
      const day = date.getDay();
      if (day === 6) return includeSaturday;
      if (day === 0) return includeSunday;
      return true;
    })
    .map(toIsoDate);
}

function renderItems() {
  itemList.replaceChildren();

  state.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">${t("row")} ${index + 1}</span>
        <button class="remove-item" type="button" title="${t("removeRow")}">x</button>
      </div>
      <label>
        ${t("description")}
        <input class="item-description" type="text" value="${escapeAttribute(item.description)}" />
      </label>
      <div class="grid three">
        <label>
          ${t("date")}
          <input class="item-date" type="date" value="${escapeAttribute(item.date)}" />
        </label>
        <label>
          ${t("hoursQty")}
          <input class="item-hours" type="text" inputmode="decimal" value="${escapeAttribute(item.hours)}" />
        </label>
        <label>
          ${t("hourlyRate")}
          <input class="item-rate" type="text" inputmode="decimal" value="${escapeAttribute(item.rate)}" />
        </label>
      </div>
      <div class="item-total"></div>
    `;

    card.querySelector(".remove-item").addEventListener("click", () => {
      state.items.splice(index, 1);
      if (!state.items.length) {
        state.items.push({
          description: "",
          date: "",
          hours: "",
          rate: "",
        });
      }
      renderItems();
      update();
    });

    [
      ["description", ".item-description"],
      ["date", ".item-date"],
      ["hours", ".item-hours"],
      ["rate", ".item-rate"],
    ].forEach(([key, selector]) => {
      card.querySelector(selector).addEventListener("input", (event) => {
        state.items[index][key] = event.target.value;
        update();
      });
    });

    itemList.appendChild(card);
  });
}

function update(message) {
  validateFields();
  renderVerification();
  renderPreview();
  renderItemTotals();
  saveState(message || t("savedAuto"));
}

function renderVerification() {
  const checks = getVerificationChecks();

  verificationPanel.innerHTML = `
    <div class="verification-title">${t("verificationTitle")}</div>
    <ul class="verification-list">
      ${checks
        .map(
          (check) => `
            <li class="${check.valid ? "valid" : "invalid"}">
              <span>${check.valid ? "✓" : "!"}</span>
              <span>${escapeHtml(check.text)}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

function getVerificationChecks() {
  return [
    {
      valid: validateAbn(state.sellerAbn),
      text: validateAbn(state.sellerAbn) ? t("checkSellerAbn") : t("missingSellerAbn"),
    },
    {
      valid: validateAbn(state.clientAbn),
      text: validateAbn(state.clientAbn) ? t("checkClientAbn") : t("missingClientAbn"),
    },
    {
      valid: validateBsb(state.bsb),
      text: validateBsb(state.bsb) ? t("checkBsb") : t("missingBsb"),
    },
    {
      valid: String(state.accountName || "").trim().length > 0,
      text: String(state.accountName || "").trim() ? t("checkAccountName") : t("missingAccountName"),
    },
    {
      valid: validateAccountNumber(state.accountNumber),
      text: validateAccountNumber(state.accountNumber) ? t("checkAccount") : t("missingAccount"),
    },
    {
      valid: isAddressComplete(state.sellerAddress),
      text: isAddressComplete(state.sellerAddress) ? t("checkSellerAddress") : t("missingSellerAddress"),
    },
    {
      valid: String(state.clientAddress || "").trim().length > 0,
      text: String(state.clientAddress || "").trim() ? t("checkClientAddress") : t("missingClientAddress"),
    },
    {
      valid: isEmailValid(state.sellerEmail),
      text: isEmailValid(state.sellerEmail) ? t("checkEmail") : t("missingEmail"),
    },
  ];
}

function renderItemTotals() {
  document.querySelectorAll(".item-card").forEach((card, index) => {
    const item = state.items[index];
    const hours = calculateExpression(item.hours);
    const rate = calculateExpression(item.rate);
    const total = hours * rate;
    card.querySelector(".item-total").textContent =
      Number.isFinite(total) && total > 0 ? `${t("lineTotal")}: ${money(total)}` : `${t("lineTotal")}: $0.00`;
  });
}

function validateFields() {
  showOptionalValidation("sellerAbnMessage", state.sellerAbn, validateAbn, t("abnValid"), t("abnInvalid"));
  showOptionalValidation("clientAbnMessage", state.clientAbn, validateAbn, t("abnValid"), t("abnInvalid"));
  showOptionalValidation("bsbMessage", state.bsb, validateBsb, t("bsbValid"), t("bsbInvalid"));
}

function showOptionalValidation(id, value, validator, goodText, badText) {
  const element = document.querySelector(`#${id}`);
  if (!String(value || "").trim()) {
    element.textContent = "";
    element.classList.remove("valid", "invalid");
    return;
  }
  showValidation(id, validator(value), goodText, badText);
}

function showValidation(id, valid, goodText, badText) {
  const element = document.querySelector(`#${id}`);
  element.textContent = valid ? goodText : badText;
  element.classList.toggle("valid", valid);
  element.classList.toggle("invalid", !valid);
}

function validateAbn(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 11) return false;

  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const numbers = digits.split("").map(Number);
  numbers[0] -= 1;
  const sum = numbers.reduce((total, number, index) => total + number * weights[index], 0);
  return sum % 89 === 0;
}

function validateBsb(value) {
  return /^\d{3}-?\d{3}$/.test(value.trim());
}

function validateAccountNumber(value) {
  const digits = onlyDigits(value);
  return digits.length >= 6 && digits.length <= 10;
}

function isAddressComplete(value) {
  const text = String(value || "").trim();
  return /\d/.test(text) && /\b[A-Z]{2,3}\b/i.test(text) && /\b\d{4}\b/.test(text);
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function renderPreview() {
  const totals = calculateTotals();

  setText("previewSellerName", state.sellerName);
  setText("previewSellerAbn", state.sellerAbn ? `ABN ${formatAbn(state.sellerAbn)}` : "");
  setText("previewSellerAddress", state.sellerAddress);
  setText("previewSellerEmail", state.sellerEmail);
  setText("previewSellerPhone", state.sellerPhone);
  setText("previewInvoiceNumber", `${t("numberPrefix")} ${state.invoiceNumber}`);

  setText("previewClientName", state.clientName);
  setText("previewClientAbn", state.clientAbn ? `ABN ${formatAbn(state.clientAbn)}` : "");
  setText("previewClientAddress", state.clientAddress);
  setText("previewIssuedDate", formatDate(state.issuedDate));
  setText("previewTerms", `${Number(state.termsDays || 0)} ${t("days")}`);
  setText("previewDueDate", formatDate(getDueDate()));
  setText("previewTotalTop", money(totals.total));
  setText("previewWorkSite", state.workSite);

  const tbody = document.querySelector("#previewItems");
  tbody.replaceChildren();

  state.items.forEach((item) => {
    const row = document.createElement("tr");
    const line = calculateLine(item);
    const description = [item.description, formatDate(item.date)].filter(Boolean).join(" - ");
    row.innerHTML = `
      <td>${escapeHtml(description)}</td>
      <td>${formatQuantity(line.hours)}</td>
      <td>${formatRate(line.rate)}</td>
      <td>${money(line.total)}</td>
    `;
    tbody.appendChild(row);
  });

  setText("previewTotal", money(totals.total));
  setText("previewPayTerms", t("payWithin").replace("{days}", Number(state.termsDays || 0)));
  setText("previewAccountName", state.accountName ? `${t("accountNamePreview")} ${state.accountName}` : "");
  setText("previewBsb", state.bsb ? `BSB: ${formatBsb(state.bsb)}` : "");
  setText("previewAccountNumber", state.accountNumber ? `${t("accountNumberPreview")} ${formatAccountNumber(state.accountNumber)}` : "");
  setText("previewReference", state.invoiceNumber ? `${t("reference")} ${state.invoiceNumber}` : "");
  setText("previewNotes", state.notes);
}

function calculateLine(item) {
  const hours = calculateExpression(item.hours);
  const rate = calculateExpression(item.rate);
  const base = roundMoney(hours * rate);
  return { hours, rate, total: base };
}

function calculateTotals() {
  return state.items.reduce(
    (totals, item) => {
      const line = calculateLine(item);
      totals.total = roundMoney(totals.total + line.total);
      return totals;
    },
    { total: 0 },
  );
}

function calculateExpression(value) {
  const expression = String(value || "").replace(/\s+/g, "");
  if (!expression) return 0;
  if (!/^[\d.+\-*/()]+$/.test(expression)) return Number(expression) || 0;

  try {
    const result = Function(`"use strict"; return (${expression});`)();
    return Number.isFinite(result) ? Number(result) : 0;
  } catch {
    return Number(value) || 0;
  }
}

function syncDueDate() {
  renderPreview();
}

function getDueDate() {
  if (!state.issuedDate) return "";
  const issued = parseLocalDate(state.issuedDate);
  if (Number.isNaN(issued.getTime())) return "";
  const daysToAdd = Math.max(Number(state.termsDays || 0) - 1, 0);
  issued.setDate(issued.getDate() + daysToAdd);
  return toIsoDate(issued);
}

function parseLocalDate(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toIsoDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function addDays(date, days) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

function todayIso() {
  return toIsoDate(new Date());
}

function nextInvoiceNumber(value) {
  const match = String(value || "").match(/^(.*?)(\d+)$/);
  if (!match) return "INV-001";
  const [, prefix, number] = match;
  return `${prefix}${String(Number(number) + 1).padStart(number.length, "0")}`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.invoiceNumber || "invoice"}-data.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = { ...structuredClone(defaultState), ...imported };
      if (!Array.isArray(state.items) || !state.items.length) {
        state.items = structuredClone(defaultState.items);
      }
      writeStateToForm();
      renderItems();
      update(t("importSaved"));
    } catch {
      saveStatus.textContent = t("importFailed");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function setText(id, value) {
  document.querySelector(`#${id}`).textContent = value || "";
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = String(value).split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatAbn(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 11) return value;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}

function formatBsb(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 6) return value;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

function formatAccountNumber(value) {
  const digits = onlyDigits(value);
  if (!digits) return String(value || "").trim();
  return digits.match(/.{1,4}/g).join(" ");
}

function money(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value) || 0);
}

function roundMoney(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function formatQuantity(value) {
  const number = Number(value) || 0;
  const formatted = Number.isInteger(number) ? String(number) : String(roundMoney(number));
  return `${formatted} ${t("hoursUnit")}`;
}

function formatRate(value) {
  const number = Number(value) || 0;
  return Number.isInteger(number) ? String(number) : String(roundMoney(number));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

bindForm();
applyLanguage();
renderItems();
update(t("loaded"));
