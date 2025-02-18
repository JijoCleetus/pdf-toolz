<script setup lang="ts">
import { decode } from "base64-arraybuffer";
import { ref, useTemplateRef } from "vue";

import { jsPDF } from "jspdf";
import { Download, Upload } from "../utilities/supabase";
import html2canvas from "html2canvas";

let fileUrl: string;
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
    const image = document.getElementById("image_hidden") as HTMLImageElement;
    image.src = fileUrl;
    html2canvas(image).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imageData, "JPEG", 0, 0, 180, 180);
      pdf.save("download.pdf");
    });

    // doc.addImage(fileUrl, "JPEG", 15, 40, 180, 180);

    console.log(data);
  }
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
  <img src="" id="image_hidden" />
  <div v-if="showPdf">
    <h3>PDF Viewer</h3>
    <PDFViewer :source="fileUrl" style="height: 100vh; width: 96vw" />
  </div>
</template>

<style scoped></style>
