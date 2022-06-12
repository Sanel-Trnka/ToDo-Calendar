<template>
  <!-- Anfang: Template für die Calendar-Entry-Component -->
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>Neuer Termin für: <strong>{{ activeDayName }}</strong></h5>
      </div>
      <div class="card-body">
        <input
            type="text"
            class="form-control"
            placeholder="Neuer Eintrag"
            v-model="event.title"
            @keyup.enter="addEvent()"
            ref="eventTitleInput"
        />
        <select class="form-select mt-2" v-model="event.priority">
          <option value="1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="-1">Tief</option>
        </select>
        <div class="text-center mt-3">
                <span
                    v-for="color in eventColors"
                    :key="color"
                    class="d-inline-block alert m-0 me-2 square"
                    :class="eventColorClasses(color)"
                    role="button"
                    @click="selectColor(color)"
                >
                </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button class="btn btn-primary" @click="addEvent()">Eintragen</button>
          <button class="btn btn-danger" @click="deleteContent()">Inhalt löschen</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Ende: Template für die Calendar-Entry-Component -->
</template>

<script>
import Store from "@/store";
export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      }
    };
  },
  computed: {
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
  },
  methods: {
    eventColorClasses(color) {
      return ["alert-" + color, this.event.color === color ? "border border-" + this.event.color : ""];
    },
    selectColor(color) {
      this.event.color = color;
    },
    deleteContent() {
      this.event.title = "";
      this.event.priority = 0;
      this.event.color = "primary";
    },
    addEvent() {
      Store.mutations.createEvent({
        title: this.event.title,
        color: this.event.color,
        priority: this.event.priority,
      });
      this.deleteContent();
    },
  },
  mounted() {
    this.$refs.eventTitleInput.focus();
  },

}
</script>

<style scoped>

</style>