import { createVuetify } from "vuetify"; // Vue 3용 Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles"; // Vuetify 스타일
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // 아이콘 설정

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  // 추가적인 Vuetify 설정
});

export default vuetify;
