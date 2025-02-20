<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { jsPDF, type RGBAData } from "jspdf";
import { Upload } from "../../utilities/supabase";
import { decode } from "base64-arraybuffer";

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
    var iframe = document.getElementById("pdf-viewer")! as HTMLIFrameElement;
    iframe.src = pdf.output("datauristring");
    //TODO: Need to change the logic to upload and replace the ifram with PDFViewer
    Upload(
      "filename.pdf" as string,
      decode(pdf.output("datauristring") as string)
    )
      .then((res) => {
        // downloadAndDisplay(res.data?.path as string);
      })
      .catch((err) => {
        console.log("Error occured", err);
      });
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
  <!-- <div v-if="showPdf"> -->
  <div>
    <h3>PDF Viewer</h3>
    <iframe id="pdf-viewer"></iframe>
    <!-- <PDFViewer :source="fileUrl" style="height: 100vh; width: 96vw" /> -->
  </div>
</template>

<style scoped>
#pdf-viewer {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
}
</style>
