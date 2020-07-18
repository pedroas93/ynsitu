<template>
  <!--begin::Advance Table Widget 2-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->

    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "widget-2",
  data() {
    return {
      list: [
        {
          text0: "media/svg/misc/006-plurk.svg",
          text1: "Sant Outstanding",
          text2: "bprow@bnc.cc",
          text3: "$2,000,000",
          text4: "ReactJs, HTML",
          text5: "Approved"
        },
        {
          text0: "media/svg/misc/015-telegram.svg",
          text1: "Application Development",
          text2: "app@dev.com",
          text3: "$4,600,000",
          text4: "Python, MySQL",
          text5: "In Progress"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "Payrol Application",
          text2: "company@dev.com",
          text3: "$560,000",
          text4: "Laravel, Metronic",
          text5: "Success"
        },
        {
          text0: "media/svg/misc/005-bebo.svg",
          text1: "HR Management System",
          text2: "hr@demo.com",
          text3: "$57,000",
          text4: "AngularJS, C#",
          text5: "Rejected"
        },
        {
          text0: "media/svg/misc/014-kickstarter.svg",
          text1: "KTR Mobile Application",
          text2: "ktr@demo.com",
          text3: "$45,200,000",
          text4: "ReactJS, Ruby",
          text5: "In Progress"
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
