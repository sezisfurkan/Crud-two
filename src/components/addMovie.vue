<template>
  <Button
    label="New"
    icon="pi pi-plus"
    class="p-button-success mr-2"
    @click="openModal"
  />
  <Dialog
    header="Header"
    v-model:visible="displayModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-pencil"></i>
          </span>
          <InputText
            placeholder="Title"
            v-model="TitleOne"
            ref="inputTitle"
            required
          />
        </div>
      </div>
    </div>
    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-pencil"></i>
          </span>
          <InputText
            placeholder="Director"
            v-model="DirectorOne"
            ref="directorTitle"
            required
          />
        </div>
      </div>
    </div>

    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-pencil"></i>
          </span>
          <InputNumber
            inputId="minmax-buttons"
            v-model="YearOne"
            type="number"
            showButtons
            :min="1980"
            :max="2023"
          />
        </div>
      </div>
    </div>

    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-pencil"></i>
          </span>
          <Rating v-model="RatingOne" :cancel="false" name="cancel" />
        </div>
      </div>
    </div>

    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-pencil"></i>
          </span>
          <InputText
            placeholder="Genre"
            v-model="GenreOne"
            ref="genreTitle"
            required
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
    </template>
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      displayModal: false,
      TitleOne: "",
      DirectorOne: "",
      YearOne: "1980",
      RatingOne: "3",
      GenreOne: "",
    };
  },

  methods: {
    openModal() {
      this.displayModal = !this.displayModal;
    },
    closeModal() {
      this.displayModal = !this.displayModal;
      this.$emit(
        "title-push",
        this.TitleOne,
        this.DirectorOne,
        this.YearOne,
        this.RatingOne,
        this.GenreOne
      );
    },
  },
};
</script>
