<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { jsPDF, type RGBAData } from "jspdf";

let fileUrl: string;
let file:
  | string
  | HTMLCanvasElement
  | HTMLImageElement
  | Uint8Array<ArrayBufferLike>
  | RGBAData;
let showPdf = ref(false);

const input = useTemplateRef("fileInput");

function onPickFile() {
  showPdf.value = false;
  input.value?.click();
}

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files ?? null;
  const fileReader = new FileReader();
  files && fileReader.readAsDataURL(files[0]);

  fileReader.addEventListener("load", () => {
    file = fileReader.result as string;
    const pdf = new jsPDF();
    pdf.addImage(file, "JPEG", 15, 40, 180, 180);
    pdf.save("download.pdf");
  });
}
</script>

<template>
  <div class="card">
    <button type="button" @click="onPickFile">Load Image</button>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/png, image/gif, image/jpeg"
      @change="onFilePicked"
    />
  </div>
  <div v-if="showPdf">
    <h3>PDF Viewer</h3>
    <PDFViewer :source="fileUrl" style="height: 100vh; width: 96vw" />
  </div>
</template>

<style scoped></style>
