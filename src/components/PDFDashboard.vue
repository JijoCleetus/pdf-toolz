<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { Download, Upload } from "../utilities/supabase";
import { decode } from "base64-arraybuffer";
import PDFViewer from "pdf-viewer-vue";

const props = defineProps<{ title: string }>();

let fileUrl: File | object;
let file: ArrayBuffer | string | null;
let showPdf = ref(false);

const input = useTemplateRef("fileInput");

function onPickFile() {
  showPdf.value = false;
  input.value?.click();
}

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files ?? null;
  let filename = files && files[0].name;
  const fileReader = new FileReader();
  files && fileReader.readAsDataURL(files[0]);

  fileReader.addEventListener("load", () => {
    file = fileReader.result;

    Upload(filename as string, decode(file as string))
      .then((res) => {
        console.log(res);
        downloadAndDisplay(res.data?.path as string);
      })
      .catch((err) => {
        console.log("Error occured", err);
      });
  });

  function downloadAndDisplay(fileName: string) {
    const { data } = Download(fileName);
    fileUrl = data.publicUrl as any;
    showPdf.value = true;

    console.log(data);
  }
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
    <h3>PDF Viewer</h3>
    <PDFViewer :source="fileUrl" style="height: 100vh; width: 100vw" />
  </div>
</template>

<style scoped></style>
