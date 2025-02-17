<script setup lang="ts">
import { decode } from "base64-arraybuffer";
import { ref, useTemplateRef } from "vue";

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

    //   Upload(filename as string, decode(file as string))
    //     .then((res) => {
    //       console.log(res);
    //       downloadAndDisplay(res.data?.path as string);
    //     })
    //     .catch((err) => {
    //       console.log("Error occured", err);
    //     });
  });

  // function downloadAndDisplay(fileName: string) {
  //   const { data } = Download(fileName);
  //   fileUrl = data.publicUrl as any;
  //   showPdf.value = true;

  //   console.log(data);
  // }
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
