<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <keep-alive>
          <component :is="activeView"/>
        </keep-alive>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <CalendarEntry/>
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button class="btn btn-lg mb-2" :class="buttonSettingsClasses" @click="toggleSettings()">
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <transition name="fade">
          <CalendarSettings v-if="showSettings"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import CalendarWeek from "@/components/CalendarWeek";
import CalendarEntry from "@/components/CalendarEntry";
import CalendarWeekAsList from "@/components/CalendarWeekAsList";
import Store from "@/store";
// import CalendarSettings from "@/components/CalendarSettings";
export default {
  name: "App",
  components: {
    CalendarWeekAsList,
    CalendarWeek,
    CalendarEntry,
    CalendarSettings: defineAsyncComponent(() => import(/*webpackChunkName: 'CalendarSettingsComponent'*/"./components/CalendarSettings.vue")),
  },
  data() {
    return {
      showSettings: false,
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
  },
  computed: {
    buttonSettingsClasses() {
      return this.showSettings ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.getters.activeView();
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

.square {
  width: 40px;
  height: 40px;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.25s ease-out;
}
</style>
