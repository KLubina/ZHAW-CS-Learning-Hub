window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};

window.StudiengangColorManagerDefaultMode = "modulgruppe";
window.StudiengangColorManagerStandardMode = {
  label: "Themengebiet",
  order: 2,
};

window.StudiengangColorManagerModes.modulgruppe = {
  label: "Modulgruppen",
  order: 1,
  categoryField: "modulgruppe",
  valueType: "standard",
  getCategories: () => [
    { name: "IT1", klasse: "it1-color" },
    { name: "IT2", klasse: "it2-color" },
    { name: "IT3", klasse: "it3-color" },
    { name: "IT4", klasse: "it4-color" },
    { name: "IT5", klasse: "it5-color" },
    { name: "IT6", klasse: "it6-color" },
    { name: "PM", klasse: "pm-color" },
  ],
  css: {
    classes: "colormanagement/modulgruppe-classes.css",
    colors: "colormanagement/modulgruppe-colors.css",
  },
};
