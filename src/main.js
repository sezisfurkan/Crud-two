import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import Rating from "primevue/rating";

import Dropdown from "primevue/dropdown";
import "../node_modules/primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);
app.use(PrimeVue);

app.component("InputText", InputText);
app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("Rating", Rating);
app.component("Dropdown", Dropdown);

app.mount("#app");
