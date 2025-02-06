<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import VuePdfEmbed, { useVuePdfEmbed } from "vue-pdf-embed";

const props = defineProps<{ title: string }>();

let fileUrl: File | string | null;
let file: ArrayBuffer | string | null;
let showPdf = ref(false);
let pdfObject = ref({});

const input = useTemplateRef("fileInput");

function onPickFile() {
  showPdf.value = false;
  input.value?.click();
}

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files ?? null;
  let filename = files && files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    file = fileReader.result;
    console.log(file);
    // const { doc } = useVuePdfEmbed({ source: file });
    // pdfObject.value = doc;
    showPdf.value = true;
  });
  files && fileReader.readAsDataURL(files[0]);
  fileUrl = files && files[0];
  const { doc } = useVuePdfEmbed({ source: fileUrl?.name });
  pdfObject.value = doc;
  showPdf.value = true;

  console.log(fileUrl);
}
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="card">
    <button type="button" @click="onPickFile">Load PDF</button>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="application/pdf"
      @change="onFilePicked"
    />
  </div>
  <div class="card" v-if="showPdf">
    <h3>PDF VIewer</h3>
    <VuePdfEmbedF :source="pdfObject" />
  </div>
</template>

<style scoped></style>
