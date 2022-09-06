<template>
  <div>
    <addMovie @title-push="titleFunc" />
    <Button
      label="Delete"
      icon="pi pi-trash"
      class="p-button-danger"
      @click="deleteSelectedProducts"
      :disabled="!selectedProducts || !selectedProducts.length"
    />
    <span class="ml-2">
      <Button
        icon="pi pi-external-link"
        label="Export"
        @click="exportCSV($event)"
      />
    </span>
    <DataTable
      ref="dt"
      :value="data"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="4"
      v-model:filters="filters1"
      filterDisplay="menu"
      :loading="loading1"
      :globalFilterFields="['Title', 'Director', 'Year', 'Genre']"
      v-model:selection="selectedProducts"
      editMode="row"
      v-model:editingRows="editingRows"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters1['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
      <Column field="Title" header="Title" :sortable="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column field="Director" header="Director" :sortable="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" /> </template
      ></Column>
      <Column field="Year" header="Year" :sortable="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" /> </template
      ></Column>
      <Column field="Rating" header="Rating" :sortable="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.Rating"
            :readonly="true"
            :cancel="false"
          /> </template
      ></Column>
      <Column field="Genre" header="Genre" :sortable="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" /> </template
      ></Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import addMovie from "./components/addMovie.vue";

export default {
  data() {
    return {
      data: [
        {
          Title: "Avengers",
          Director: "Joss Whedon",
          Year: 2012,
          Rating: "4",
          Genre: "Sci-fi",
        },
        {
          Title: "Tenet",
          Director: "Christopher Nolan",
          Year: 2013,
          Rating: 4.5,
          Genre: "Sci-fi",
        },
        {
          Title: "Inception",
          Director: "Christopher Nolan",
          Year: 2014,
          Rating: 3.5,
          Genre: "Sci-fi",
        },
        {
          Title: "seven",
          Director: "David Fincher",
          Year: 2015,
          Rating: 3,
          Genre: "Crime",
        },
        {
          Title: "asd",
          Director: "Joss Whedon",
          Year: 2015,
          Rating: 5,
          Genre: "Sci-fi",
        },
        {
          Title: "deve",
          Director: "Joss Whedon",
          Year: 2002,
          Rating: 2.5,
          Genre: "Sci-fi",
        },
      ],
      TitleOnee: "",
      DirectorOnee: "",
      YearOnee: null,
      RatingOnee: "",
      GenreOnee: "",
      filters1: null,
      selectedProducts: null,
      editingRows: [],
    };
  },
  created() {
    this.initFilters1();
  },
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        "country.name": {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    titleFunc(TitleOne, DirectorOne, YearOne, RatingOne, GenreOne) {
      this.TitleOnee = TitleOne;
      this.DirectorOnee = DirectorOne;
      this.YearOnee = YearOne;
      this.RatingOnee = RatingOne;
      this.GenreOnee = GenreOne;
      this.data.push({
        Title: this.TitleOnee,
        Director: this.DirectorOnee,
        Year: this.YearOnee,
        Rating: this.RatingOnee,
        Genre: this.GenreOnee,
      });
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    onRowEditSave(event) {
      let { newData, index } = event;

      this.data[index] = newData;
    },
    deleteSelectedProducts() {
      this.data = this.data.filter(
        (val) => !this.selectedProducts.includes(val)
      );
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    },
  },
  mounted() {
    if (localStorage.data) {
      this.data = JSON.parse(localStorage.data);
    }
  },
  watch: {
    data: {
      handler(newData) {
        localStorage.data = JSON.stringify(newData);
      },
      deep: true,
    },
  },

  components: { addMovie },
};
</script>
