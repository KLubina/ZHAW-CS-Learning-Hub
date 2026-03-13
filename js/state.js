// State Management
const State = {
  allData: [],
  currentView: "institution", // 'institution' oder 'category'
  currentFilters: {
    type: "", // Standardmäßig alle Hochschultypen anzeigen
    institution: "group_zurich",
    category: "",
  },
  showMinors: false, // Minors standardmäßig ausgeblendet

  initializeData() {
    // Fokusseite: nur ZHAW Informatik Vollzeit + Teilzeit
    this.allData = [
      {
        name: "ZHAW",
        website:
          "https://www.zhaw.ch/de/engineering/studium/bachelorstudium/informatik",
        type: "fh",
        kategorien: [
          {
            name: "1. Informatik",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Informatik (Vollzeit)", grad: "BSc" },
                  { name: "Informatik (Teilzeit)", grad: "BSc" },
                ],
              },
            ],
          },
        ],
      },
    ];
  },

  setView(view) {
    this.currentView = view;
  },

  setFilter(filterType, value) {
    this.currentFilters[filterType] = value;
  },

  getData() {
    return this.allData;
  },

  getView() {
    return this.currentView;
  },

  getFilters() {
    return this.currentFilters;
  },

  setShowMinors(value) {
    this.showMinors = value;
  },

  getShowMinors() {
    return this.showMinors;
  },
};
